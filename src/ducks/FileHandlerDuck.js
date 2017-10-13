// FileHandler.js duck *quack*
import {CardStatus} from 'carbon-components-react';

//Action types
export const DROP_FILE = 'DROP_FILE'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const PUSH_OBJECT = 'PUSH_OBJECT'

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

        case 'PUSH_OBJECT':
        return{}
    }
    
}

// Action Creators

//1. Loads an object into store.
export const pushObject = (file) => {
    return {
        type: 'PUSH_OBJECT',
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

//3. Changes FileHandler UI state when something is dropped on it
export const dropFile = (fileHandlerState) => {
    return {
        type: 'DROP_FILE',
        fileHandlerState
    }
}