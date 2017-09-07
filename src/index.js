import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

window.apiRoot = "http://test.volo.nz/api/"

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
