import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './setupStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Initialise the global store.
export const store = configureStore();

// Log the initial state of the store (currently set in reducers.js)
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener (componentWillUnmount)?
let unsubscribe = store.subscribe(() =>
console.log(store.getState())
)

ReactDOM.render(
<div>
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>
</div>
    , document.getElementById('root'));
registerServiceWorker();
