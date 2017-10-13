import React, { Component } from 'react'
import { store } from '../App'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import FileHandler from './FileHandler'
import * as fileHandlerActions from '../ducks/FileHandlerDuck'
import {parseData, now} from '../internal/Parser'

import './FileHandlerContainer.css';

// I probably need to connect() this to the redux store, not the presentiational component.

class FileHandlerContainer extends Component {
    constructor(props) {
        super(props)
        
        this.handleFileDrop = this.handleFileDrop.bind(this)
        this.cleanParsedData = this.cleanParsedData.bind(this)
        this.state = { droppedFiles: [] }
    }
    
    cleanParsedData() {
        let len = this.state.parsedData.length;
        let cleanData = []
        let start = now();
        for (let i = 0; i < len; i++) {
            cleanData.push(this.state.parsedData[i].splice(2,2));
        }
        let end = now();
        console.log("Time to clean: ", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
        console.log(cleanData)
        this.setState({cleanData : cleanData})
    }
    //This is a really big function - I'll make it smaller later.
    handleFileDrop(item, monitor) {
        if (monitor) {
            console.log("you dropped something..")
            let component = this
            // Update the state of droppedFiles
            const droppedFiles = monitor.getItem().files
            //If it's not what i want, throw it away.
            if(droppedFiles[0].type === 'text/csv') {
                // log file that was passed
                console.log(droppedFiles[0])
                // update the state of the ui
                store.dispatch(fileHandlerActions.dropFile())
                // update state with dropped file
                this.setState({ droppedFiles })
                // parse
                let parsePromise = new Promise ((resolve, reject) => {
                    let start = now();
                    console.log('Starting parsing');
                    try {
                        parseData(this.state.droppedFiles[0],',', function(results) {
                            let len = results.data.length
                            component.setState({
                                parsedData : results.data.slice(9, len) //update array with parsed data
                                      })
    
                            let end = now();
                            resolve({start: start, end: end});
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
                parsePromise.then((obj) => {
                    console.log('resolved');
                    console.log('Finished parsing:');
                    console.log("Time:", (obj.end-obj.start || "(Unknown; your browser does not support the Performance API)"), "ms");
                    component.cleanParsedData()
                }, (err) => {
                    console.log('rejected');
                });
            } else {
                // Reset the state of droppedFilesß
                this.setState({ droppedFiles: [] })
                // scold the user..
                console.log("only drop a csv file here...")
            } 

        }
    }

    render() {
        const { FILE } = NativeTypes
        const { droppedFiles } = this.state

        return(
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <div>
                        <FileHandler accepts={[FILE]} onDrop={this.handleFileDrop} />
                    </div>
                </div>
            </DragDropContextProvider>
        )
    }
}

export default DragDropContext(HTML5Backend)(FileHandlerContainer);