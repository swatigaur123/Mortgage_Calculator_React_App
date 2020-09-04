import React from 'react';
import logo from './logo.svg';
import './App.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import MortgageCalculator from './Components/MortgageCalculator';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
       <MortgageCalculator></MortgageCalculator>
      {/* </header> */}
    </div>
  );
}

export default App;
