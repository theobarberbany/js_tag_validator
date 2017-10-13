import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './App'
import './index.css';
import App from './App';
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
