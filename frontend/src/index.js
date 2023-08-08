import React from 'react';
import ReactDOM from 'react-dom/client';
import './Index.css';
import reportWebVitals from './reportWebVitals';
import Myrouter from './CRUD-Operation/Routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Myrouter />
);

reportWebVitals();
