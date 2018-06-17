import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    axios.get('/api')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    axios.get('/foo')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log("process.env.DB_HOST-->%s,process.env.DB_USER-->%s,process.env.DB_PASS-->%s",process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
          <form>
            <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
