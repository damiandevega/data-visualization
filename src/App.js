import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Main from './components/Main';

import Divider from '@material-ui/core/Divider';

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Line Search" />
        <Divider />
        <Main />
      </div>
    );
  }
}

export default App;
