import { observer } from "mobx-react";
import React from "react";
import { MultiInput } from "./store";
import InputLabel from "@material-ui/core/InputLabel";
import * as ReactDOM from "react-dom";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import styled from "@emotion/styled";
import FormControl from "@material-ui/core/FormControl";

const FormControl1 = styled(({ color, ...other }) => (
  <FormControl {...other} />
))`
  & {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${p => p.theme.spacing.unit * 2}px;
  }
`;

@observer
export class DropDown extends React.Component<{ src: MultiInput; multiple: boolean }> {
  static defaultProps = { multiple: false };
  state = { labelWidth: 0 };
  inputLabelRef: React.RefObject<InputLabel> = React.createRef();

  componentWillReact () {
    let domNode = ReactDOM.findDOMNode(
      this.inputLabelRef.current
    ) as HTMLLabelElement;
    this.setState({
      labelWidth: domNode.offsetWidth
    });
  }

  render () {
    return (
      <FormControl1 variant="outlined" error={!!this.props.src.error}>
        <InputLabel ref={this.inputLabelRef} htmlFor={this.props.src.id}>
          {this.props.src.label}
        </InputLabel>
        <Select
          multiple={this.props.multiple}
          fullWidth
          value={this.props.src.value}
          onChange={e =>
            (this.props.src.value = (e.target.value as unknown) as string[])
          }
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={this.props.src.label}
              id={this.props.src.id}
            />
          }
        >
          {this.props.src.items.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {this.props.src.error || this.props.src.description}
        </FormHelperText>
      </FormControl1>
    );
  }
}