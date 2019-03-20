import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { MultiInput } from "./store";
import InputLabel from "@material-ui/core/InputLabel";
import * as ReactDOM from "react-dom";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import styled from "@emotion/styled";
import FormControl from "@material-ui/core/FormControl";

const FormControl1 = styled((other) => (
  <FormControl {...other} />
))`
  & {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${p => p.theme.spacing.unit * 2}px;
  }
`;

export const DropDown = observer(
  ({ src, multiple = false }: { src: MultiInput; multiple?: boolean }) => {
    const [labelWidth, set_labelWidth] = useState(0);
    const inputLabelRef = useRef(null as InputLabel | null);
    useEffect(() => {
      set_labelWidth(
        (ReactDOM.findDOMNode(inputLabelRef.current) as HTMLLabelElement)
          .offsetWidth
      );
    }, [src.label]);
    return (
      <FormControl1 variant="outlined" error={!!src.error}>
        <InputLabel ref={inputLabelRef} htmlFor={src.id}>
          {src.label}
        </InputLabel>
        <Select
          multiple={multiple}
          fullWidth
          value={src.value}
          onChange={e =>
            (src.value = (e.target.value as unknown) as string[])
          }
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name={src.label}
              id={src.id}
            />
          }
        >
          {src.items.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {src.error || src.description}
        </FormHelperText>
      </FormControl1>
    );
  }
);
