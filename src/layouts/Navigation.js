import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/Navigation.css'
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap'
import { Person, BoxArrowRight, HouseDoor } from 'react-bootstrap-icons';
import $ from 'jquery';
import jwt from 'jwt-decode'

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
        localStorage.clear();
        this.setState({
            logged: false,
        })
    }

    componentDidMount() {
        if (this.props.logged || localStorage.getItem("token")) {
            const decodeToken = jwt(localStorage.getItem("token"))
            //console.log(decodeToken);
            this.setState({
                decodeToken: decodeToken
            })
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
                            <Nav.Link href="/protecteddata">Protected Data</Nav.Link>
                            <Nav.Link href="/explore">Explore</Nav.Link>
                            <Nav.Link href="/things">Things To Do</Nav.Link>
                            {!this.props.logged ? <Button className="navbtn"><Nav.Link href="/login">
                                <Person className="personIcon" />  Login</Nav.Link>
                            </Button> :
                                <Dropdown alignRight id="basic-nav-dropdown" >
                                    <Dropdown.Toggle className="dropdownToggle" variant="info" id="dropdown-custom-1">{this.state.decodeToken.email} </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdownBackground">
                                        <Dropdown.Header className="dropdownHeader" >Logged as: {this.state.decodeToken.first_name} {this.state.decodeToken.last_name}</Dropdown.Header>
                                        <Dropdown.Item
                                            className="dropdownItem"
                                            href="/protecteddata">Protected Data</Dropdown.Item>
                                        <Dropdown.Item className="dropdownItem" href="#action/3.2">My Places</Dropdown.Item>
                                        <Dropdown.Item
                                            className="dropdownItem" href="#action/3.3">Find User</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#action/3.4"><Button className="navbtn" onClick={this.logout}>
                                            <Nav.Link href="/home">
                                                <BoxArrowRight className="personIcon" />  Logout</Nav.Link>
                                        </Button></Dropdown.Item>
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
