import React, { Component } from 'react';
import { store } from './index'
import FileHandlerContainer from './components/FileHandlerContainer';
import { Button } from 'carbon-components-react'
import logo from './logo.svg';
import './App.css';

import * as fileHandlerActions from './ducks/FileHandlerDuck'


class App extends Component {
  componentDidMount() {
    document.title = "Tag Validator";
  }
  
  simulateFileDrop () {
    //Do some redux magic here
    // Dispatch some actions (woo!)
    store.dispatch(fileHandlerActions.dropFile())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <link rel="stylesheet" href="https://unpkg.com/carbon-components/css/carbon-components.min.css" />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Validate Tags</h1>
        </header>

        <div className="FileHandlerContainer">
          <div className="FileHandlerContainer"><FileHandlerContainer  /></div>
        </div>
        <Button onClick={this.simulateFileDrop}>Simulate File Drop </Button>
      </div>
    );
  }
}

export default App;
