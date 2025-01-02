import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Leva } from "leva";
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Leva />
    <App />
  </React.StrictMode>
);
 