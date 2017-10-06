import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './App';
import registerServiceWorker from './registerServiceWorker';


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
