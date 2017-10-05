// Reducers: take some state and a redux action and return a new state to be stored back in redux
import { combineReducers } from 'redux';
import {SIMULATE_DROP} from './actions';
import CardStatus from './carbon/CardStatus';

const fileHandler = (state, action) => {
    const initialState = {
        cardTitle: "Get started",
        cardIcon: "copy",
        cardInfo:['Drop manifest file here'], 
        status: CardStatus.appStatus.NOT_RUNNING,
    }

    if (typeof state === 'undefined') {
        return initialState
      }
    
    switch (action.type) {
        case 'SIMULATE_DROP':
        return {...state,
            cardTitle: "Crunching Numbers",
            cardIcon: "copy",
            cardInfo:['Won\'t be a minute'], 
            status: CardStatus.appStatus.RUNNING,
        }
        default:
          return state
    }
    
}

export { fileHandler }