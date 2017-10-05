import React, { Component } from 'react';
import {FileHandler} from './components/FileHandler'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  simulateFileDrop () {
    //Do some redux state magic here
    console.log("Eventually this will do something")
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
