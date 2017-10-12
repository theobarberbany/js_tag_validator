import React, { Component } from 'react'
import { store } from '../index'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import FileHandler from './FileHandler'
import * as fileHandlerActions from '../ducks/FileHandlerDuck'
import FileList from './FileList'
import parseData from '../internal/Parser.js'

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
            let component = this
            //dropped files end up in here
            const droppedFiles = monitor.getItem().files
            // Should be able to push to redux store here. Just logging to console for now
            store.dispatch(fileHandlerActions.dropFile())
            console.log("you dropped something")
            console.log(this.state.droppedFiles)
            this.setState({ droppedFiles })
            //parseData(this.state.droppedFiles, function(results) {
            //    component.setState({
            //      parsedData: results.data, //update array with parsed data
            //    })
            //})

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
                    <div className="FileList">
                        <FileList files={droppedFiles} />
                    </div> 
                </div>
            </DragDropContextProvider>
        )
    }
}

export default DragDropContext(HTML5Backend)(FileHandlerContainer);