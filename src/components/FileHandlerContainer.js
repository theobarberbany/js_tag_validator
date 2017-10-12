import React, { Component } from 'react'
import { store } from '../index'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import FileHandler from './FileHandler'
import * as fileHandlerActions from '../ducks/FileHandlerDuck'
import FileList from './FileList'
import {parseData, now} from '../internal/Parser.js'

import './FileHandlerContainer.css';

// I probably need to connect() this to the redux store, not the presentiational component.

class FileHandlerContainer extends Component {
    constructor(props) {
        super(props)
        
        this.handleFileDrop = this.handleFileDrop.bind(this)
        this.state = { droppedFiles: [] }
    }
    
    handleFileDrop(item, monitor) {
        if (monitor) {
            console.log("you dropped something")
            let component = this
            // On each file drop, reset the state of droppedFiles (a bit hacky.)
            this.setState({ droppedFiles: [] })
            // Update the state of droppedFiles
            const droppedFiles = monitor.getItem().files
            // log what type of file was passed
            console.log(droppedFiles[0].type)
            // update the state of the ui
            store.dispatch(fileHandlerActions.dropFile())
            // update state with dropped file
            this.setState({ droppedFiles })
            // log what dropped file is 
            console.log(this.state.droppedFiles[0])
            // To Do : set the callback of parseData to push parsed data to store.
            let parsePromise = new Promise ((resolve, reject) => {
                let start = now();
                console.log('Starting parsing')
                parseData(this.state.droppedFiles[0], function(results) {
                    component.setState({
                      parsedData: results.data, //update array with parsed data
                    })
                    let end = now();
                    resolve();
                    console.log('Finished parsing:');
                    console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
                })
            });

            return parsePromise
            

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