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

  runValidation(cleanData) {
    let output = run(cleanData);
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
      console.log("you dropped something..");
      const droppedFiles = monitor.getItem().files;
      //If it's not csv, throw it away.
      if (droppedFiles[0].type === "text/csv") {
        console.log(droppedFiles[0]);
        // update the state of the ui
        this.props.dropFile();
        // update state with dropped file
        this.setState({ droppedFiles });
        // parse
        parseData2(this.state.droppedFiles[0], ",").then(
          obj => {
            console.log("Finished parsing:", obj);
            //VERIFY ITS A SANGER MANIFEST HERE
            let len = obj.data.length;
            this.setState({
              parsedData: obj.data.slice(9, len) //update array with parsed data
            });
            //Call cleaning function
            this.cleanParsedData();
          },
          err => {
            Raven.captureException(err);
            console.log("Failed to parse, this is embarrassing!");
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
