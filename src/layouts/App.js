import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './Header'
import Navigation from './Navigation'
import Page from './Page'
import Footer from './Footer'
import '../styles/App.css';
import Cookies from 'js-cookie'
//import jwt from 'jwt-decode'
class App extends Component {
  pathname = ''
  state = {
    logged: Cookies.get("logged"),
    decodeToken: '',
    pathname: ''
  }

  componentDidMount() {
    this.setState({
      pathname: window.location.pathname
    })
  }

  render() {
    // console.log(window.location.pathname);
    // console.log(this.state.decodeToken);
    return (
      <Router>
        <div className='app'>
          {this.state.pathname !== '/404' ? <header> <Header /> <Navigation logged={this.state.logged} decodeToken={this.state.decodeToken} /> </header> : ''}
          <main>
            <section>
              {<Page />}
            </section>
          </main>
          {this.state.pathname !== '/404' ? <footer>
            {<Footer />}
          </footer> : ''}
        </div>
      </ Router >
    );
  }
}

export default App;


