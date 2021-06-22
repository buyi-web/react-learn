import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import  matchPath from './react-router/matchPath'
import {createBrowserHistory} from './react-router-dom/history/createBrowserHistory'
import { v4 as uuidv4 } from 'uuid';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


