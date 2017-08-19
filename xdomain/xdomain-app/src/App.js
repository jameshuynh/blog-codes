import React, { Component } from 'react';
import logo from './logo.svg';
import axiosClient from './axiosClient';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Welcome to React'
    };
  }

  componentWillMount() {
    axiosClient.get('/home/welcome').then(response => {
      this.setState({
        message: response.data.content
      });
    });
  }

  render() {
    let { message } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            {message}
          </h2>
        </div>
      </div>
    );
  }
}

export default App;
