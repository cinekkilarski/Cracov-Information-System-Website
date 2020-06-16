import React, { Component } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

class AccessForms extends Component {
  state = {
    registerForm: true,
    registrationSuccess: false,
  };

  handleSwitchForm = () =>
    this.setState({
      registerForm: !this.state.registerForm,
    });

  handleRegistrationSuccess = () =>
    this.setState({
      registrationSuccess: true,
    });

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        registerForm: !this.state.registerForm,
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.registerForm ? (
          <LoginForm
            changeForm={this.handleSwitchForm}
            registrationSuccess={this.state.registrationSuccess}
            handleLogged={this.props.handleLogged}
          />
        ) : (
          <RegisterForm
            changeForm={this.handleSwitchForm}
            handleRegistrationSuccess={this.handleRegistrationSuccess}
          />
        )}
      </div>
    );
  }
}

export default AccessForms;
