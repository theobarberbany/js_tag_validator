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

import { parseData, now } from "../internal/Parser";
import { run } from "../internal/Validator";

import "./FileHandlerContainer.css";

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

class FileHandlerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.cleanParsedData = this.cleanParsedData.bind(this);
    this.state = {
      droppedFiles: []
    };
  }

  componentDidMount() {
    //Fetch the cache
    this.props.fetchCache();
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Raven.captureException(error, { extra: errorInfo });
  }

  cleanParsedData() {
    let len = this.state.parsedData.length;
    let cleanData = [];
    let start = now();
    for (let i = 0; i < len; i++) {
      cleanData.push(this.state.parsedData[i].splice(2, 2));
    }
    let end = now();
    console.log(
      "Time to clean: ",
      end - start ||
        "(Unknown; your browser does not support the Performance API)",
      "ms"
    );
    this.props.pushData(cleanData);
    let start1 = now();
    let output = run(cleanData);
    let end1 = now();
    console.log(
      "Time to validate: ",
      end1 - start1 ||
        "(Unknown; your browser does not support the Performance API)",
      "ms"
    );
    this.props.processOverview(output);
    this.setState({ hideFileHandler: true });
  }
  //This is a really big function - I'll make it smaller later.
  handleFileDrop(item, monitor) {
    if (monitor) {
      console.log("you dropped something..");
      let component = this;
      // Update the state of droppedFiles
      const droppedFiles = monitor.getItem().files;
      //If it's not what i want, throw it away.
      if (droppedFiles[0].type === "text/csv") {
        // log file that was passed
        console.log(droppedFiles[0]);
        // update the state of the ui
        this.props.dropFile();
        // update state with dropped file
        this.setState({ droppedFiles });
        // parse
        let parsePromise = new Promise((resolve, reject) => {
          let start = now();
          console.log("Starting parsing");
          try {
            parseData(this.state.droppedFiles[0], ",", function(results) {
              let len = results.data.length;
              component.setState({
                parsedData: results.data.slice(9, len) //update array with parsed data
              });

              let end = now();
              resolve({ start: start, end: end });
            });
          } catch (e) {
            reject(e);
          }
        });
        parsePromise.then(
          obj => {
            console.log("resolved");
            console.log("Finished parsing:");
            console.log(
              "Time:",
              obj.end - obj.start ||
                "(Unknown; your browser does not support the Performance API)",
              "ms"
            );
            component.cleanParsedData();
          },
          err => {
            console.log("rejected");
          }
        );
      } else {
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
                <h2>Validation Complete: {this.state.droppedFiles[0].name}</h2>
                <WarningContainer />
                <OutputContainer />
                <DatabaseContainer />
              </div>
            ) : (
              <FileHandler accepts={[FILE]} onDrop={this.handleFileDrop} />
            )}
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

FileHandlerContainer = DragDropContext(HTML5Backend)(FileHandlerContainer);
FileHandlerContainer = connect(null, mapDispatchToProps)(FileHandlerContainer);
export default FileHandlerContainer;
