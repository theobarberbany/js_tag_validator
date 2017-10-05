import React, { Component } from 'react';
import { createStore } from 'redux';
import { fileHandler } from './reducers.js';
import {FileHandler} from './components/FileHandler';
import CardStatus from './carbon/CardStatus';
import logo from './logo.svg';
import './App.css';

import {
  simulateDrop,
  copyClipboard,
  toggleComplete
} from './actions'

let store = createStore(fileHandler, window.STATE_FROM_SERVER)

// Log the initial state of the store (currently set in reducers.js)
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
console.log(store.getState())
)

// Dispatch some actions (woo!)
//store.dispatch(simulateDrop())

class App extends Component {
  simulateFileDrop () {
    //Do some redux state magic here
    store.dispatch(simulateDrop())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href="https://unpkg.com/carbon-components/css/carbon-components.min.css" />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Validate Tags</h1>
        </header>

        <div className="FileHandler">
          <FileHandler  />
          
        </div>
        <button onClick={this.simulateFileDrop}>Simulate File Drop </button>
      </div>
    );
  }
}

export default App;
