import React, { Component } from 'react';

export default class ProtectedData extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/comments/protecteddata', {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <div>
        <h1>Protected Data:</h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}