
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ViewAuth from './views/viewAuth';
import ViewMain from './views/viewMain';

import './App.css';

class App extends Component{

  render(){
    return (
      <Router>

      <Route exact path="/" render={props => (
        <React.Fragment>
          <ViewAuth auth="login"/>
        </React.Fragment>
      )}/>

      <Route exact path="/login" render={props => (
        <React.Fragment>
          <ViewAuth auth="login"/>
        </React.Fragment>
      )}/>

      <Route exact path="/register" render={props => (
        <React.Fragment>
          <ViewAuth auth="register"/>
        </React.Fragment>
      )}/>

      <Route exact path="/app" render={props => (
        <React.Fragment>
          <ViewMain/>
        </React.Fragment>
      )}/>

      </Router>
    );
  }

}

export default App;

