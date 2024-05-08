import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import VerifyDiffInfo from "./VerifyDiffInfo";
import VerifyDiffResult from "./VerifyDiffResult";

class VerifyDiff extends React.Component {
  state = {
    expanded: true,
  };

  toggleExpand = (e, props) => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    // console.log("these are props in step 3", this.props);
    const devicesObj = this.props.devices;
    const deviceNames = Object.keys(devicesObj);
    const deviceData = Object.values(devicesObj);

    return (
      <div className="task-container">
        <div className="heading">
          <h2>
            <Icon
              name="dropdown"
              onClick={this.toggleExpand}
              rotated={this.state.expanded ? null : "counterclockwise"}
            />
            Verify difference (3/4)
            <Popup
              content="Shows diffs generated by the device operating system. Make sure nothing unexpected has changed."
              trigger={<Icon name="question circle outline" size="small" />}
              wide
            />
          </h2>
        </div>
        <div className="task-collapsable" hidden={!this.state.expanded}>
          <p>Step 3 of 4: Look through and verify diff</p>
          <div>
            <VerifyDiffInfo
              deviceNames={deviceNames}
              dryRunChangeScore={this.props.dryRunChangeScore}
            />
            <VerifyDiffResult
              deviceNames={deviceNames}
              deviceData={deviceData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyDiff;
