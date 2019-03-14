import React, { Component } from "react";
import { observer } from "mobx-react";
import { Member, MemberPrimary, Todo } from "./store";
import { CheckBox } from "./CheckBox";
import { DropDown } from "./DropDown";
import { Input } from "./Input";
import { ExpansionPanelSummary } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { observable } from "mobx";
import Button from "@material-ui/core/Button";

const PrimaryMemberView = observer(
  (props: {
    test: MemberPrimary;
    isExpanded: boolean;
    onToggleExpand: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
  }) => {
    return (
      <ExpansionPanel
        expanded={props.isExpanded}
        onChange={props.onToggleExpand}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ flex: 1 }}>
            {props.test.name.value || "Ikke navngivet"}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Input src={props.test.cpr} />
          <Input src={props.test.name} />
          <Input src={props.test.address} />
          <Input src={props.test.email} />
          <Input src={props.test.phone} />
          <CheckBox src={props.test.magazine} />
          <DropDown src={props.test.memberships} multiple={true} />
          <DropDown src={props.test.payment} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
);

const MemberView = observer(
  (props: {
    test: Member;
    remove: () => void;
    isExpanded: boolean;
    onToggleExpand: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
  }) => {
    return (
      <ExpansionPanel
        expanded={props.isExpanded}
        onChange={props.onToggleExpand}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography style={{ flex: 1 }}>
            {props.test.name.value || "Ikke navngivet"}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Input src={props.test.cpr} />
          <Input src={props.test.name} />
          <DropDown src={props.test.memberships} multiple={true} />
          <DropDown src={props.test.payment} />
          <Button
            variant="outlined"
            color="secondary"
            style={{ alignSelf: "flex-end" }}
            onClick={props.remove}
          >
            remove spouse
          </Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
);
class App extends Component<{ test: Todo }> {
  @observable expandedIndex = -1;
  render() {
    return (
      <div className="App">
        <PrimaryMemberView
          test={this.props.test.member}
          isExpanded={this.expandedIndex === -1}
          onToggleExpand={(_, exp) => (this.expandedIndex = exp ? -1 : -2)}
        />
        {this.props.test.spouses.map((mem, i) => (
          <MemberView
            key={mem.id}
            test={mem}
            remove={() => this.props.test.removeSpouse(i)}
            isExpanded={this.expandedIndex === i}
            onToggleExpand={(_, exp) => (this.expandedIndex = exp ? i : -2)}
          />
        ))}
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setTimeout(() => {
                this.expandedIndex = this.props.test.spouses.length - 1;
              }, 0);
              this.props.test.addSpouse();
            }}
            style={{ margin: "0 8px" }}
          >
            add spouse
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={this.props.test.validate}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default observer(App);
