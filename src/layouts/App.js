import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'
import Page from './Page'
import Footer from './Footer'
import '../styles/App.css';
//import jwt from 'jwt-decode'
class App extends Component {
  state = {
    logged: localStorage.getItem("logged"),
    decodeToken: ''
  }

  // handleDecodeToken = () => {
  //   const decodeToken = jwt(localStorage.getItem("token"))
  //   console.log(decodeToken);
  //   this.setState({
  //     decodeToken: decodeToken
  //   })
  // }


  render() {

    return (
      < BrowserRouter>
        <div className='app'>
          <header>
            {<Header />}
            {<Navigation logged={this.state.logged} decodeToken={this.state.decodeToken} />}
          </header>
          <main>
            <section>
              {<Page handleLogged={this.handleLoggedUser} />}
            </section>
          </main>
          <footer>
            {<Footer />}
          </footer>
        </div>
      </ BrowserRouter>
    );
  }
}

export default App;


