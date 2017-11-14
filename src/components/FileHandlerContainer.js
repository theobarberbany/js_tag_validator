import React, { Component } from "react";
import Raven from "raven-js";
import { connect } from "react-redux";
import * as fileHandlerActionCreators from "../ducks/FileHandlerDuck";
import * as cacheActions from "../ducks/cacheDuck";
import { DragDropContext, DragDropContextProvider } from "react-dnd";
import HTML5Backend, { NativeTypes } from "react-dnd-html5-backend";
import FileHandler from "./FileHandler";
import WarningContainer from "./WarningContainer";
import OutputContainer from "./OutputContainer";
import DatabaseContainer from "./DatabaseContainer";

import { parseData2 } from "../internal/Parser";
import { run } from "../internal/Validator";

import "./FileHandlerContainer.css";

const re = /^[ATCGatgc]+$/;

class FileHandlerContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.cleanParsedData = this.cleanParsedData.bind(this);
    this.state = {
      droppedFiles: [],
      key: 0
    };
  }

  componentDidMount() {
    //Fetch the cache
    this.props.fetchCache();
    window.debug = this;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  runValidation(cleanData) {
    let index;
    // Determine if dual index or single index run.
    if (re.test(cleanData[0][0]) && re.test(cleanData[0][1])) {
      index = 0;
      this.setState({ indexing: "dual" });
    } else {
      index = 1;
      this.setState({ indexing: "single" });
    }
    let output = run(cleanData, index);
    this.props.processOverview(output);
    this.setState({ hideFileHandler: true }); // Hide FileHandler Component
  }

  cleanParsedData() {
    let len = this.state.parsedData.length;
    let cleanData = [];
    for (let i = 0; i < len; i++) {
      cleanData.push(this.state.parsedData[i].splice(2, 2));
    }
    this.props.pushData(cleanData);
    this.runValidation(cleanData);
  }

  handleFileDrop(item, monitor) {
    if (monitor) {
      console.log("you dropped something: ", monitor.getItem().files[0]);
      const component = this;
      const droppedFiles = monitor.getItem().files;
      let bad_input = false;

      if (droppedFiles[0].type === "text/csv") {
        component.props.dropFile(); // update ui
        this.setState({ droppedFiles }); // update state with dropped file
        // parse
        parseData2(this.state.droppedFiles[0], ",").then(
          obj => {
            console.log("Finished parsing:", obj);
            //Verify the format of the .csv (is it a manifest)
            if (
              obj.data[8][2] !== "TAG OLIGO" ||
              obj.data[8][3] !== "TAG2 OLIGO"
            ) {
              bad_input = true;
            } else if (!re.test(obj.data[9][2])) {
              // check the first tag is a valid combination of ATCG
              bad_input = true;
            }

            if (!bad_input) {
              let len = obj.data.length;
              this.setState({
                parsedData: obj.data.slice(9, len) //update array with parsed data
              });
              // component.props.dropFile();
              // this.setState({ key: Math.random() }); // hackery to try get the component to redraw, it doesn't work.
              //Call cleaning function
              this.cleanParsedData();
            } else {
              this.setState({ droppedFiles: [] });
              //Temporary hack to reset page on bad csv drop.
              window.location.reload();
            }
          },
          err => {
            Raven.captureException(err);
            console.log("Failed to parse, this is embarrassing!");
          }
        );
      }
      if (droppedFiles[0].type !== "text/csv") {
        bad_input = true;
      }
      if (bad_input) {
        // Reset the state of droppedFiles
        this.setState({ droppedFiles: [] });
        // scold the user..
        console.log("only drop a csv file here...");
      }
    }
  }

  render() {
    const { FILE } = NativeTypes;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <div>
            {this.state.hideFileHandler ? (
              <div id="Output">
                <h2>
                  Validation Complete: {this.state.droppedFiles[0].name} -
                  indexing: {this.state.indexing}
                </h2>
                <WarningContainer />
                <OutputContainer />
                <DatabaseContainer />
              </div>
            ) : (
              <FileHandler
                key={this.state.key}
                accepts={[FILE]}
                onDrop={this.handleFileDrop}
              />
            )}
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pushData: data => {
      dispatch({ type: "PUSH_DATA", data });
    },
    processOverview: data => {
      dispatch(fileHandlerActionCreators.processOverview(data));
    },
    dropFile: () => {
      dispatch({ type: "DROP_FILE" });
    },
    fetchCache: () => {
      dispatch(
        cacheActions.fetchCache(
          "https://raw.githubusercontent.com/theobarberbany/js_tag_validator/master/src/internal/cache_min.json"
        )
      );
    }
  };
};

FileHandlerContainer = DragDropContext(HTML5Backend)(FileHandlerContainer);
FileHandlerContainer = connect(null, mapDispatchToProps)(FileHandlerContainer);
export default FileHandlerContainer;
