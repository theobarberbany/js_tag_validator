/*
 * action types
 */
export const SIMULATE_DROP = 'SIMULATE_DROP'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const COPY_CLIPBOARD = 'COPY_CLIPBOARD'

/* 
 * action creators
 */

//1. Loads dropped file (manifest csv) into store.(needs to be async. Will leave for later)

//2. Toggles a critical warning's complete / incomplete feild (notes it as addressed)
export const toggleComplete = (id) => {
    return {
        type: 'TOGGLE_COMPLETE',
        id
    }
}

//3. Copy verbose data output to clipboard. ///  I Don't think this needs to be done in redux?
export const copyClipboard = (verboseData) => {
    return {
        type: 'COPY_CLIPBOARD',
        verboseData
    }
}

//4 Simulates dropping a file onto the canvas when button pressed (passes new state)
export const simulateDrop = (fileHandlerState) => {
    return {
        type: 'SIMULATE_DROP',
        fileHandlerState
    }
}