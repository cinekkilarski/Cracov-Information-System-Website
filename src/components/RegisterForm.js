import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/LoginRegisterForm.css";
import { Alert } from "react-bootstrap";
import { PersonPlus } from "react-bootstrap-icons";
class RegisterForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    errors: {
      err_email: false,
      err_pass: false,
      err_first_name_empty: false,
      err_last_name_empty: false,
      err_email_empty: false,
      err_pass_empty: false,
      err_confirm_pass_empty: false,
      err_confirm_pass: false,
    },
  };

  messages = {
    email_incorrect: "Please provide a valid email address.",
    password_incorrect: "Cannot include spaces",
    confirm_password_incorrect: "It is not the same.",
    empty_input: "This field is required.",
  };

  handleInputChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formRegisterValidation = () => {
    let email_ver = false;
    let password_ver = false;
    let first_name_empty_ver = false;
    let last_name_empty_ver = false;
    let email_empty_ver = false;
    let password_empty_ver = false;
    let confirm_password_empty_ver = false;
    let confirm_password_ver = false;
    let result = false;

    if (this.state.first_name.length !== 0) {
      first_name_empty_ver = true;
    }

    if (this.state.last_name.length !== 0) {
      last_name_empty_ver = true;
    }

    if (
      this.state.email.indexOf("@") !== -1 &&
      this.state.email.indexOf(" ") === -1 &&
      this.state.email.length > 0
    ) {
      email_ver = true; // true = ver correct
    }

    if (this.state.email.length !== 0) {
      email_empty_ver = true;
    }

    if (
      this.state.password.indexOf(" ") === -1 &&
      this.state.password.length > 0
    ) {
      password_ver = true; //ok
    }

    if (this.state.password.length !== 0) {
      password_empty_ver = true;
    }
    if (
      this.state.confirm_password.length >= 1 &&
      this.state.confirm_password === this.state.password
    ) {
      confirm_password_ver = true; // true = ver correct
    }

    if (this.state.confirm_password.length !== 0) {
      confirm_password_empty_ver = true;
    }

    if (
      email_ver &&
      password_ver &&
      first_name_empty_ver &&
      last_name_empty_ver &&
      email_empty_ver &&
      password_empty_ver &&
      confirm_password_empty_ver &&
      confirm_password_ver
    ) {
      result = true;
    }
    return {
      email_ver,
      email_empty_ver,
      password_ver,
      password_empty_ver,
      first_name_empty_ver,
      last_name_empty_ver,
      confirm_password_empty_ver,
      confirm_password_ver,
      result,
    };
  };

  handleSubmit = (e) => {
    if (!e) return;

    e.preventDefault();

    const { result: isValid, ...details } = this.formRegisterValidation();
    if (isValid) {
      this.handleRegisterRequest();
      this.setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        errors: {
          err_email: false,
          err_pass: false,
          err_first_name_empty: false,
          err_last_name_empty: false,
          err_email_empty: false,
          err_pass_empty: false,
          err_confirm_pass_empty: false,
          err_confirm_pass: false,
        },
      });
    } else {
      this.setState({
        errors: {
          err_email: !details.email_ver,
          err_pass: !details.password_ver,
          err_first_name_empty: !details.first_name_empty_ver,
          err_last_name_empty: !details.last_name_empty_ver,
          err_email_empty: !details.email_empty_ver,
          err_pass_empty: !details.password_empty_ver,
          err_confirm_pass_empty: !details.confirm_password_empty_ver,
          err_confirm_pass: !details.confirm_password_ver,
        },
      });
    }
  };

  handleRegisterRequest = () => {
    const registerData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.changeForm();
          this.props.handleRegistrationSuccess();
        } else {
          throw Error(res.status);
        }
      })
      .catch((error) => console.log("Error: " + error));
  };

  render() {
    const {
      empty_input,
      password_incorrect,
      email_incorrect,
      confirm_password_incorrect,
    } = this.messages;
    const {
      err_email,
      err_pass,
      err_first_name_empty,
      err_last_name_empty,
      err_email_empty,
      err_pass_empty,
      err_confirm_pass_empty,
      err_confirm_pass,
    } = this.state.errors;

    return (
      <div className="modalLog">
        <form
          className="modalContentLog"
          onSubmit={this.handleSubmit}
          noValidate
        >
          <div className="imgcontainer">
            <PersonPlus className="avatar" size="150px" />
          </div>
          <div className="container">
            <label>
              <b>First Name</b>
            </label>
            {err_first_name_empty && (
              <Alert className="errormessage"> {empty_input} </Alert>
            )}
            <input
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              value={this.state.first_name}
              onChange={this.handleInputChange}
            />
            <label>
              <b>Last Name</b>
            </label>
            {err_last_name_empty && (
              <Alert className="errormessage"> {empty_input} </Alert>
            )}
            <input
              type="text"
              placeholder="Enter Last Name"
              name="last_name"
              value={this.state.last_name}
              onChange={this.handleInputChange}
            />
            <label>
              <b>Email</b>
            </label>
            {err_email && (
              <Alert className="errormessage">
                {err_email_empty ? empty_input : email_incorrect}{" "}
              </Alert>
            )}
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <label>
              <b>Password</b>
            </label>
            {err_pass && (
              <Alert className="errormessage">
                {err_pass_empty ? empty_input : password_incorrect}{" "}
              </Alert>
            )}
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <label>
              <b> Confirm Password</b>
            </label>
            {err_confirm_pass && (
              <Alert className="errormessage">
                {err_confirm_pass_empty
                  ? empty_input
                  : confirm_password_incorrect}{" "}
              </Alert>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              value={this.state.confirm_password}
              onChange={this.handleInputChange}
            />
            <button className="loginbutton" type="submit">
              Register
            </button>
          </div>
          <div className="container  containerbotton">
            <Link to="/">
              <button className="loginbutton cancelbtn">Close</button>
            </Link>
            <button
              className="loginbutton changeformbtn"
              onClick={this.props.changeForm}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
