import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navigation.css';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { Person, BoxArrowRight, HouseDoor } from 'react-bootstrap-icons';
import $ from 'jquery';
import jwt from 'jwt-decode';
import Cookies from 'js-cookie';

// TODO do this within react; jQuery shouldn't be bundled with apps in 2020.
$(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 30) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});

class Navigation extends Component {
    state = {
        decodeToken: ''
    }

    logout = () => {
        Cookies.remove("token");
        Cookies.remove("logged");
    }

    componentDidMount() {
        if (this.props.logged && Cookies.get("token")) {
            const decodeToken = jwt(Cookies.get("token"))
            this.setState({
                decodeToken: decodeToken
            })
        }
    }

    componentDidUpdate() {
        if (this.state.decodeToken && (Date.now().toString().slice(0, 10) >= this.state.decodeToken.exp)) {
            Cookies.remove("token");
            Cookies.remove("logged");
            window.location.reload(true)
        }
    }

    render() {
        return (
            <div>
                <div></div>
                <Navbar expand="md" fixed="top">
                    <Navbar.Brand href="/home"><HouseDoor className="mainLogo" />Cracov City</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/explore">Explore</Nav.Link>
                            <Nav.Link href="/things">Things To Do</Nav.Link>
                            {!this.props.logged ? <Nav.Link href="/login"><Button className="navbtn">
                                <Person className="personIcon" />  Login</Button></Nav.Link>
                                :
                                <Dropdown alignRight  >

                                    <Dropdown.Toggle className="dropdownToggle" >{this.state.decodeToken.email} </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdownBackground">
                                        <Dropdown.Header className="dropdownHeader" >Logged as: {this.state.decodeToken.first_name} {this.state.decodeToken.last_name}</Dropdown.Header>

                                        <Dropdown.Item
                                            className="dropdownItem" href="/finduser">Find User</Dropdown.Item>

                                        <Dropdown.Item className="dropdownItem" href="/accountsettings">Account Settings</Dropdown.Item>
                                        <Dropdown.Divider />

                                        <Nav.Link href="/home">
                                            <Button id='logoutBtn' className="navbtn" onClick={this.logout}> <BoxArrowRight className="personIcon" />  Logout  </Button></Nav.Link>

                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;
