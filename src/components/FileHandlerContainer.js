import React, { Component } from "react";
import Raven from "raven-js";
import { connect } from "react-redux";
import "./FileHandlerContainer.css";
import * as fileHandlerActionCreators from "../ducks/FileHandlerDuck";
import * as cacheActions from "../ducks/cacheDuck";
import { DragDropContext, DragDropContextProvider } from "react-dnd";
import HTML5Backend, { NativeTypes } from "react-dnd-html5-backend";
import FileHandler from "./FileHandler";
import WarningContainer from "./WarningContainer";
import OutputContainer from "./OutputContainer";
import DatabaseContainer from "./DatabaseContainer";
import SentryBoundary from "./SentryBoundary";

import { parseCSV, parseData } from "../internal/Parser";
import { run } from "../internal/Validator";

const re = /^[ATCGatgc]+$/;
const headers = ["Index", "Index2", "TAG OLIGO", "TAG2 OLIGO"];

export class FileHandlerContainer extends Component {
  constructor(props) {
    super(props);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.state = {
      droppedFiles: [
        {
          name: "placeholder"
        }
      ],
      key: 0
    };
  }

  componentDidMount() {
    //Fetch the cache
    this.props.fetchCache();
    window.debug = this;
  }

  shouldComponentUpdate() {
    if (this.state.bad_input) {
      throw new Error("Parsing Failure");
    } else {
      return true;
    }
  }

  runValidation(cleanData) {
    // Determine if dual index or single index run.
    if (re.test(cleanData[0][0]) && re.test(cleanData[0][1])) {
      this.setState({
        indexing: "dual"
      });
    } else {
      cleanData = cleanData.reduce((acc, cur) => acc.concat(cur[0]), []);
      console.log("Single run data:", cleanData);
      this.setState({
        indexing: "single"
      });
    }
    let output = run(cleanData);
    this.props.processOverview(output);
    this.setState({
      hideFileHandler: true
    }); // Hide FileHandler Component
  }

  handleFileDrop(item, monitor) {
    if (monitor) {
      this.props.pushToS3(
        monitor.getItem().files[0],
        monitor.getItem().files[0].name
      );
      console.log("you dropped something: ", monitor.getItem().files[0]);
      const component = this;
      const droppedFiles = monitor.getItem().files;

      if (
        droppedFiles[0].type === "text/csv" ||
        droppedFiles[0].type === "application/vnd.ms-excel"
      ) {
        component.props.dropFile(); // update ui
        this.setState({
          droppedFiles
        }); // update state with dropped file
        // parse
        parseCSV(this.state.droppedFiles[0], ",").then(
          obj => {
            console.log("Finished parsing:", obj);
            parseData(obj.data, re, headers).then(results => {
              this.setState({
                parsedData: results //update array with parsed data
              });
              //Call cleaning function
              this.props.pushData(results);
              this.runValidation(results);
            });
          },
          err => {
            Raven.captureException(err);
            console.log("Failed to parse, this is embarrassing!");
          }
        );
      }
      if (
        !(
          droppedFiles[0].type === "text/csv" ||
          droppedFiles[0].type === "application/vnd.ms-excel"
        )
      ) {
        //ToDO: make this fail to a "you dropped something that is not a manifest"
        this.setState({
          bad_input: true
        });
      }
      if (this.state.bad_input) {
        // Reset the state of droppedFiles
        this.setState({
          droppedFiles: []
        });
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
                  Indexing: {this.state.indexing}{" "}
                </h2>
                <SentryBoundary>
                  <WarningContainer />
                </SentryBoundary>
                <br />
                <SentryBoundary>
                  <OutputContainer indexing={this.state.indexing} />
                </SentryBoundary>
                <br />
                <SentryBoundary>
                  <DatabaseContainer indexing={this.state.indexing} />
                </SentryBoundary>
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
      dispatch({
        type: "PUSH_DATA",
        data
      });
    },
    processOverview: data => {
      dispatch(fileHandlerActionCreators.processOverview(data));
    },
    dropFile: () => {
      dispatch({
        type: "DROP_FILE"
      });
    },
    fetchCache: () => {
      dispatch(
        cacheActions.fetchCache(
          "https://raw.githubusercontent.com/theobarberbany/js_tag_validator/master/src/internal/cache_min.json"
        )
      );
    },
    pushToS3: (file, fileName) => {
      dispatch(fileHandlerActionCreators.pushToS3(file, fileName));
    }
  };
};

let FileHandlerContainerExport = DragDropContext(HTML5Backend)(
  FileHandlerContainer
);
FileHandlerContainerExport = connect(null, mapDispatchToProps)(
  FileHandlerContainer
);
export default FileHandlerContainerExport;
