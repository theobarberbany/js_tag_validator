import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Ignoring this as it's not really nessecary?

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
