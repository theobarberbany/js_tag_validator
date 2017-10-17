// FileHandler.js duck *quack*
import {CardStatus} from 'carbon-components-react';

//Action types
export const DROP_FILE = 'DROP_FILE'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const PUSH_DATA = 'PUSH_DATA'

// Reducer Initial state for *this* component (Duck) (This only gets passed a
// slice of the state)
const initialState = {
    displayProps: {
        cardTitle: "Get started",
        cardIcon: "copy",
        cardInfo: ['Drop manifest file here'],
        status: CardStatus.appStatus.NOT_RUNNING
    },
    cleanData: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DROP_FILE:
            return {
                ...state,
                displayProps: {
                    cardTitle: "Crunching Numbers",
                    cardIcon: "copy",
                    cardInfo: ['Won\'t be a minute'],
                    status: CardStatus.appStatus.RUNNING
                }
            }

        case PUSH_DATA:
            return {
                ...state,
                cleanData: action.data
            }
        default:
            return state
    }

}

// Action Creators

//1. Loads an object into store.
export const pushData = (data) => {
    return {type: PUSH_DATA, data}
}
// 2. Toggles a critical warning's complete / incomplete feild (notes it as
// addressed)
export const toggleComplete = (id) => {
    return {type: TOGGLE_COMPLETE, id}
}

//3. Changes FileHandler UI state when something is dropped on it
export const dropFile = (fileHandlerState) => {
    return {type: DROP_FILE, fileHandlerState}
}