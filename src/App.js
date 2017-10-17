import React, {Component} from 'react';
import store from './setupStore';
import {Provider} from 'react-redux';
import FileHandlerContainer from './components/FileHandlerContainer';
import {Button} from 'carbon-components-react'
import logo from './logo.svg';
import '../node_modules/carbon-components/css/carbon-components.css'
import './App.css';

import * as fileHandlerActions from './ducks/FileHandlerDuck'

class App extends Component {
  componentDidMount() {
    document.title = "Tag Validator";
    // Log the initial state of the store
    console.log(store.getState())
    // Every time the state changes, log it Note that subscribe() returns a function
    // for unregistering the listener (componentWillUnmount)?
    this.unsubscribe = store.subscribe(() => console.log(store.getState()))
    window.App = this;
  }

  componentWillUnmount() {
    this.unsubscribe()
    console.log('unsubscribed from store')
  }

  simulateFileDrop() {
    //Do some redux magic here Dispatch some actions (woo!)
    store.dispatch(fileHandlerActions.dropFile())
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Validate Tags</h1>
          </header>

          <div className="FileHandlerContainer">
            <div className="FileHandlerContainer"><FileHandlerContainer/></div>
          </div>
          <Button onClick={this.simulateFileDrop}>Simulate File Drop
          </Button>
        </div>
      </Provider>
    );
  }
}

export default App;
