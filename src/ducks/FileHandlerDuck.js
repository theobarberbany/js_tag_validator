// FileHandler.js duck *quack*
import CardStatus from '../carbon/CardStatus';

//Action types
export const DROP_FILE = 'DROP_FILE'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const COPY_CLIPBOARD = 'COPY_CLIPBOARD'
export const PUSH_FILE = 'PUSH_FILE'

// Reducer

//Initial state for *this* component (Duck)
const initialState = {
    cardTitle: "Get started",
    cardIcon: "copy",
    cardInfo:['Drop manifest file here'], 
    status: CardStatus.appStatus.NOT_RUNNING,
}

export default function reducer(state=initialState, action) {
    
    switch (action.type) {
        case 'DROP_FILE':
        return {...state,
            cardTitle: "Crunching Numbers",
            cardIcon: "copy",
            cardInfo:['Won\'t be a minute'], 
            status: CardStatus.appStatus.RUNNING,
        }
        default: return state
    }
    
}

// Action Creators

//1. Loads dropped file (manifest csv) into store.
export const pushFile = (file) => {
    return {
        type: 'PUSH_FILE',
        file
    }
}
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

//4 Changes FileHandler state when something is dropped on it(passes new state)
export const dropFile = (fileHandlerState) => {
    return {
        type: 'DROP_FILE',
        fileHandlerState
    }
}