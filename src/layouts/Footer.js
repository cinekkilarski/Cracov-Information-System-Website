import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => (
    <footer id="footer" className="footer-1">
        <div className="main-footer widgets-dark typo-light">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="widget subscribe no-box">
                            <h5 className="widget-title">Cracov Info<span></span></h5>
                            <p>Master's Thesis:</p>
                            <p>Project and implementation of tourist
                            information system of Kraków city– web and mobile application </p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="widget no-box">
                            <h5 className="widget-title">Quick Links<span></span></h5>
                            <ul className="thumbnail-widget">
                                <li>
                                    <div className="thumb-content">
                                        <Link to='/login'>Login</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumb-content">
                                        <Link to='/home'> Home</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumb-content">
                                        <Link to='/explore'> Explore</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumb-content">
                                        <Link to='/things'> Things To Do</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="thumb-content">
                                        <Link to='/finduser'> Find  User</Link>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="widget no-box">
                            <h5 className="widget-title">Get Started<span></span></h5>
                            <p>Get access to users database, rate and comment places.</p>
                            <a className="btn" href="/register" >Register Now</a>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">

                        <div className="widget no-box">
                            <h5 className="widget-title">Contact Me<span></span></h5>

                            <p><a href="mailto:info@domain.com" title="glorythemes">cinek.mazur@gmail.com</a></p>
                            <ul className="social-footer2">
                                <li>
                                    <a href='https://www.linkedin.com/in/marcin-mazur-7724a718b/' target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" ></i></a>
                                </li>
                                <li>
                                    <a href='https://github.com/cinekmazur' target="_blank" rel="noopener noreferrer"><i className="fa fa-github-square"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="footer-copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>Master's Thesis: Cracov Iformation System - Marcin Mazur © 2020. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

);

export default Footer;