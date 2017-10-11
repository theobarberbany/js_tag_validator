import React, { Component } from 'react'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import FileHandler from './FileHandler'
import FileList from './FileList'

// I probably need to connect() this to the redux store, not the presentiational component.

class FileHandlerContainer extends Component {
    constructor(props) {
        super(props)

        this.handleFileDrop.bind(this)

        this.state = { droppedFiles: [] }
    }

    handleFileDrop(item,monitor) {
        if (monitor) {
            const droppedFiles = monitor.getItem().files
            // Should be able to push to redux store here. Just logging to console for now
            console.log("you dropped something")
        }
    }

    render() {
        const { FILE } = NativeTypes
        const { droppedFiles } = this.state

        return(
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <FileHandler accepts={ [FILE] } onDrop={this.handleFileDrop} />
                    <FileList files={droppedFiles} />
                </div>
            </DragDropContextProvider>
        )
    }
}

export default DragDropContext(HTML5Backend)(FileHandlerContainer);