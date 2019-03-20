import styled from "@emotion/styled";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import { observer } from "mobx-react-lite";
import { CheckboxInput } from "./store";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const FormControl1 = styled(({ color, ...other }) => (
  <FormControl {...other} />
))`
  & {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
`;
const FormHelperText1 = styled(({ color, ...other }) => (
  <FormHelperText {...other} />
))`
  & {
    margin: 8px 12px 0;
  }
`;
const FormControlLabel1 = styled(({ ...other }) => (
  <FormControlLabel
    classes={{
      root: "root", // class name, e.g. `classes-nesting-root-x`
      label: "label" // class name, e.g. `classes-nesting-label-x`
    }}
    {...other}
  />
))`
  &.root {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    box-sizing: border-box;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 3px 12px;
    border-radius: ${p => p.theme.shape.borderRadius}px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.23);
    transition: ${p =>
  p.theme.transitions.create("border-color", {
    duration: p.theme.transitions.duration.shorter,
    easing: p.theme.transitions.easing.easeOut
  })};
    &:hover:not(disabled):not(focused):not(error) {
      border-color: ${p => p.theme.palette.text.primary};
      // Reset on touch devices, it doesn't add specificity
      @media (hover: none) {
        border-color: rgba(0, 0, 0, 0.23);
      }
    }
  }
  & .label {
    font-family: ${p => p.theme.typography.fontFamily};
    font-size: ${p => p.theme.typography.pxToRem(16)};
    line-height: 1.1875em; // Reset (19px), match the native input line-height
    display: inline-flex;
    align-items: center;
    color: ${p => p.theme.palette.text.secondary};
    z-index: 1;
    pointer-events: "none";
  }
`;
export const CheckBox = observer(function CheckBox (p: { src: CheckboxInput }) {
  // const ast = required ? " *" : " ";
  // const _label = label + ast;
  return (
    <FormControl1
      // required={required}
      error={!!p.src.error}
    >
      <FormControlLabel1
        control={
          <Checkbox
            checked={p.src.value}
            // indeterminate={indeterminate}
            onChange={e => (p.src.value = e.target.checked)}
            color={"primary"}
          />
        }
        label={p.src.label}
      />
      <FormHelperText1>{p.src.error || p.src.description}</FormHelperText1>
    </FormControl1>
  );
});