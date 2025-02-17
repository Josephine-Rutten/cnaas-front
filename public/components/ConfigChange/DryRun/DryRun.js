import React from "react";
import { Checkbox, Form, Icon, Popup } from "semantic-ui-react";
import permissionsCheck from "../../../utils/permissions/permissionsCheck";
import DryRunError from "./DryRunError";
import DryRunProgressBar from "./DryRunProgressBar";
import DryRunProgressInfo from "./DryRunProgressInfo";

class DryRun extends React.Component {
  state = {
    resync: false,
    expanded: true,
  };

  toggleExpand = (e, props) => {
    this.setState({ expanded: !this.state.expanded });
  };

  checkboxChangeHandler = (event, data) => {
    this.setState({ [data.name]: data.checked }, () => {
      console.log(`resync:${this.state.resync}`);
    });
  };

  dryrunButtonOnclick() {
    this.props.dryRunSyncStart({ resync: this.state.resync });
  }

  render() {
    const { dryRunProgressData } = this.props;
    const { dryRunJobStatus } = this.props;
    const { jobId } = this.props;
    let error = "";
    let dryrunButtonDisabled = this.props.dryRunDisable;
    let resetButtonDisabled = true;

    if (dryRunJobStatus === "EXCEPTION") {
      // console.log("jobStatus errored");
      error = [
        <DryRunError
          key="dryrunerror"
          dryRunSyncStart={this.props.dryRunSyncStart}
          dryRunProgressData={dryRunProgressData}
          devices={this.props.devices}
          resync={this.state.resync}
        />,
      ];
    }
    if (dryRunJobStatus === "FINISHED") {
      resetButtonDisabled = false;
    }
    if (this.props.repoWorkingState === true) {
      dryrunButtonDisabled = true;
    }

    return (
      <div className="task-container">
        <div className="heading">
          <h2>
            <Icon
              name="dropdown"
              onClick={this.toggleExpand}
              rotated={this.state.expanded ? null : "counterclockwise"}
            />
            Dry run (2/4)
            <Popup
              content={
                "This step will generate new configurations and send them to the targeted devices, and the devices will then compare their currently running configuration to the newly generated and return a diff." +
                " No configuration will be changed. If any device has been configured outside of NMS you will get a configuration hash mismatch error, and need to do a force retry to see which local changes a commit would overwrite."
              }
              trigger={<Icon name="question circle outline" size="small" />}
              wide="very"
            />
          </h2>
        </div>
        <div className="task-collapsable" hidden={!this.state.expanded}>
          <p>
            Step 2 of 4: Sending generated configuration to devices to calculate
            diff and check sanity
          </p>
          <Form>
            <div className="info">
              <Checkbox
                label="Re-sync devices (check for local changes made outside of NMS)"
                name="resync"
                checked={this.state.resync}
                onChange={this.checkboxChangeHandler}
              />
            </div>
            <div className="info">
              <button
                id="dryrunButton"
                hidden={!permissionsCheck("Config change", "write")}
                disabled={dryrunButtonDisabled}
                onClick={() => this.dryrunButtonOnclick()}
              >
                Dry run
              </button>
              <button
                id="resetButton"
                hidden={!permissionsCheck("Config change", "write")}
                disabled={resetButtonDisabled}
                onClick={() => this.props.resetState()}
              >
                Start over
              </button>
            </div>
          </Form>
          <DryRunProgressBar
            dryRunJobStatus={dryRunJobStatus}
            dryRunProgressData={dryRunProgressData}
            totalDevices={this.props.totalCount}
          />
          <DryRunProgressInfo
            dryRunJobStatus={dryRunJobStatus}
            dryRunProgressData={dryRunProgressData}
            jobId={jobId}
            logLines={this.props.logLines}
          />
        </div>
        {error}
      </div>
    );
  }
}

export default DryRun;
