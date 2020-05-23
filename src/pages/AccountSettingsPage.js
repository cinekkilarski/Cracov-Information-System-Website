import React, { Component } from 'react';
import '../styles/AccountSettingsPage.css'
import { Alert } from 'react-bootstrap'
import jwt from 'jwt-decode'
import Cookies from 'js-cookie'

class AccountSettingsPage extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        new_first_name: '',
        new_last_name: '',
        new_email: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
        displayPasswordMessage: false,
        passwordMessage: ''
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        console.log(name);
        this.setState({
            [name]: e.target.value
        })
    }

    handleChangeUserData = (value) => {
        // let new_first_name
        let updateUserData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
        }
        switch (value) {
            case 'newFirstName':
                const new_first_name = this.state.new_first_name
                updateUserData = { ...updateUserData, new_first_name }
                break
            case 'newLastName':
                const new_last_name = this.state.new_last_name
                updateUserData = { ...updateUserData, new_last_name }
                break
            case 'newEmail':
                const new_email = this.state.new_email
                updateUserData = { ...updateUserData, new_email }
                break
            default:
                console.log('ups');
        }

        fetch('http://localhost:8080/api/users/updateuserdata', {
            method: 'PUT',
            body: JSON.stringify(updateUserData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + Cookies.get('token')
            }
        }).then(res => res.json())
            .then(res => {
                Cookies.set("token", res.token)
                window.location.reload(true);
            })

    }

    handleChangePassword = (e) => {
        e.preventDefault()
        if (this.state.new_password.length > 0 && this.state.confirm_password.length > 0 && this.state.old_password.length > 0) {
            if (this.state.new_password === this.state.confirm_password) {

                let updatePassword = {
                    email: this.state.email,
                    password: this.state.old_password,
                    new_password: this.state.new_password
                }
                fetch('http://localhost:8080/api/users/password', {
                    method: 'PUT',
                    body: JSON.stringify(updatePassword),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then(res => res.json())
                    .then(res => {
                        this.setState({
                            displayPasswordMessage: true,
                            passwordMessage: res.message
                        })
                        setTimeout(function () {
                            Cookies.remove("token")
                            Cookies.remove("logged")
                            window.location.reload(true)
                        }, 4000);

                    })
                    .catch(err => {
                        this.setState({
                            displayPasswordMessage: true,
                            passwordMessage: "Inwalid old password."
                        })
                    })
            } else {
                this.setState({
                    displayPasswordMessage: true,
                    passwordMessage: "Confirm Password and New Password must be the same."
                })
            }
        } else {
            this.setState({
                displayPasswordMessage: true,
                passwordMessage: "All fields are required"
            })
        }
    }

    componentDidMount() {
        const decodedToken = jwt(Cookies.get("token"))
        this.setState({
            first_name: decodedToken.first_name,
            last_name: decodedToken.last_name,
            email: decodedToken.email
        })
    }
    render() {
        // console.log(this.state.decodedToken);
        return (
            <div style={{ minHeight: '1000px' }}>
                <div className="mainSettingsDiv">
                    <h2>Account Settings</h2>
                    <div className="changeAccountProp">
                        <p > Current Name:  {this.state.first_name}</p>
                        <input type="text" placeholder='New Name' name='new_first_name' value={this.state.new_first_name} onChange={this.handleInputChange} />
                        <button onClick={() => this.handleChangeUserData('newFirstName')}>
                            Change
                    </button>
                    </div>
                    <div className="changeAccountProp">
                        <p > Current Last Name:  {this.state.last_name}</p>
                        <input type="text" placeholder='New Last Name' name='new_last_name' value={this.state.new_last_name} onChange={this.handleInputChange} />
                        <button onClick={() => this.handleChangeUserData('newLastName')}>
                            Change
                    </button>
                    </div>
                    <div className="changeAccountProp">
                        <p > Current Email:  {this.state.email}</p>
                        <input type="text" placeholder='New Email' name='new_email' value={this.state.new_email} onChange={this.handleInputChange} />
                        <button onClick={() => this.handleChangeUserData('newEmail')}>
                            Change
                    </button>
                    </div>
                    <div className="changeAccountProp">
                        <div className="passwordChange">
                            {this.state.displayPasswordMessage && <Alert className="alertSettings" variant='danger'>
                                {this.state.passwordMessage}
                            </Alert>}
                            <form onSubmit={this.handleChangePassword}>
                                <label htmlFor="old_password">Old Password</label>
                                <input id="old_password" type="password" name="old_password" placeholder="Your current password" value={this.state.old_password} onChange={this.handleInputChange} />
                                <label htmlFor="new_password">New Password</label>
                                <input type="password" id="new_password" name="new_password" placeholder="New Password"
                                    value={this.state.new_password}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input type="password" id="confirm_password" name="confirm_password"
                                    value={this.state.confirm_password}
                                    placeholder="Confirm New Password" onChange={this.handleInputChange} />
                                <button >Change</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AccountSettingsPage;