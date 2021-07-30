import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Wrapper'
import "@fontsource/roboto";
import "firebase/auth";

ReactDOM.render(
  <React.StrictMode>
     <Wrapper />
  </React.StrictMode>,
  document.getElementById('root')
);