import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
//import AppMultiPages from './AppMultiPages';
//import AppGuessNumber from './AppGuessNumber';
//import AppHook from './AppHook';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

//App e-commerce
root.render(
  <App />
);

// Affichage Multipages
//let contacts= {name:'toto', tel:'0123456789', email:'toto@gmail.com'}
////  root.render(
//      <AppMultiPages {...contacts}/>
//  );

// GuessNumber
//root.render(
//    <AppGuessNumber />
//);

// Hook
//root.render(
//    <AppHook />
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
