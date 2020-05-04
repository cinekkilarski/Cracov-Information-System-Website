import React, { Component } from 'react';
import { Alert } from 'react-bootstrap'
import '../styles/LoginRegisterForm.css'
import { PeopleFill } from 'react-bootstrap-icons';
import { withRouter, Link } from "react-router-dom";
class LoginForm extends Component {

    state = {
        email: 'qwertin@gmail.com',
        password: 'elo123',
        errors: {
            err_email: false,//true - display error
            err_pass: false,
            err_invalid: false,
            err_email_empty: false,
            err_pass_empty: false
        },
    }

    messages = {
        email_incorrect: 'Please provide a valid email address.',
        password_incorrect: 'Cannot include spaces',
        empty_input: 'This field is required.',
        invalid_login: 'Invalid Login or Password.'
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        //console.log(name);
        this.setState({
            [name]: e.target.value
        })
    }

    formLoginValidation() {
        let email_ver = false;
        let password_ver = false;
        let email_empty_ver = false;
        let password_empty_ver = false;
        let result = false;
        //console.log(this.state.email.length);

        if (this.state.email.indexOf('@') !== -1 && this.state.email.indexOf(' ') === -1 && this.state.email.length > 0) {
            email_ver = true // true = ver correct
        }

        if (this.state.email.length !== 0) {
            //email_ver = true
            email_empty_ver = true
        }

        if (this.state.password.indexOf(' ') === -1 && this.state.password.length > 0) {
            password_ver = true//ok
        }

        if (this.state.password.length !== 0) {
            //email_ver = true
            password_empty_ver = true
        }

        if (email_ver && password_ver && email_empty_ver && password_empty_ver) {
            result = true //everything is correct
        }

        return ({
            email_ver,
            email_empty_ver,
            password_ver,
            password_empty_ver,
            result
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const validation_result = this.formLoginValidation()
        //console.log(validation_result);
        if (validation_result.result) {
            this.handleLoginRequest()
            this.setState({
                email: '',
                password: '',
                errors: {
                    err_email: false,
                    err_email_empty: false,
                    err_pass: false,
                    err_pass_empty: false,
                }
            })
        } else {
            this.setState({
                errors: {
                    err_email: !validation_result.email_ver,
                    err_email_empty: !validation_result.email_empty_ver,
                    err_pass: !validation_result.password_ver,
                    err_pass_empty: !validation_result.password_empty_ver,
                }
            })
        }

    }

    handleLoginRequest = () => {

        const loginData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(JSON.stringify(loginData));

        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(res => res.json()).then(res => {
            // if (res.status === 200) {
            localStorage.setItem("token", res.token)
            localStorage.setItem("logged", true)

            this.props.history.push("/home");
            window.location.reload()

            this.props.handleLogged()
            //     } else {
            //         const error = new Error(res.error);
            //         throw error;
            //     }
        })
            .catch(err => {
                this.handleUnauthorized()
            });
    }

    handleUnauthorized = () => {
        this.setState({
            errors: {
                err_invalid: true
            }
        })
    }

    render() {

        const { empty_input, email_incorrect, invalid_login, password_incorrect } = this.messages
        const { err_email, err_pass, err_email_empty, err_pass_empty, err_invalid } = this.state.errors
        //console.log(err_pass, err_pass_empty);
        return (
            <div className="modal" >
                <form className="modal-content animate" onSubmit={this.handleSubmit} noValidate>

                    <div className="imgcontainer">
                        {/* <img src="" alt="Avatar" className="avatar" /> */}
                        < PeopleFill className="avatar" size="150px" />
                    </div>
                    {this.props.registrationSuccess && <Alert variant="success"> User created successfully. Now you can log in.</Alert>}
                    {err_invalid && <Alert className='errormessage' >{invalid_login} </Alert>}

                    <div className="container">

                        <label ><b>Email   </b></label>
                        {err_email && <Alert className='errormessage' >{err_email_empty ? empty_input : email_incorrect} </Alert>}
                        <input type="email" id="email" name="email" placeholder="Enter  Email" value={this.state.email} onChange={this.handleInputChange} />

                        <label ><b>Password</b></label>
                        {err_pass && <Alert className='errormessage' >{err_pass_empty ? empty_input : password_incorrect} </Alert>}
                        <input type="password" id="password" name="password" placeholder="Enter  Password" value={this.state.password} onChange={this.handleInputChange} />
                        <button className="loginbutton" type="submit" >Login</button>
                    </div>
                    <div className="container  containerbotton">
                        <Link to="/"><button className="loginbutton cancelbtn" >Close</button></Link>
                        <button className="loginbutton changeformbtn" onClick={this.props.changeForm}>Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);