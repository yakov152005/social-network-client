import React from "react";
import { NavLink } from "react-router-dom";
import {NAV_CREATE_ACCOUNT, NAV_LOGIN, NAV_DASHBOARD, NAV_PROFILE, NAV_SETTINGS, NAV_CREATOR} from "../utils/Constants";

export default function NavBar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="navbar-brand disabled" href="#" aria-disabled="true">
                    <img
                        src="/image/logoNetWork.png" alt="NetWork" width="35" height="30"
                        className="d-inline-block align-text-top rounded" />
                    <strong style={{color: "white", fontFamily:'Brush Script MT'}}>Social-Network</strong>

                </a>

                <ul className="nav nav-pills mb-3">
                {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_CREATE_ACCOUNT}>
                                    <strong> Create Account</strong><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person-vcard" viewBox="0 0 16 16">
                                        <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
                                    </svg>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_LOGIN}>
                                    <strong>Login</strong><br/>&nbsp; &nbsp;&nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                    </svg>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_CREATOR}>
                                    <strong>Creator</strong><br/>&nbsp; &nbsp; &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-code" viewBox="0 0 16 16">
                                        <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z"/>
                                    </svg>
                                </NavLink>
                            </li>
                        </>
                ) : (
                    <>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_DASHBOARD}>
                                <strong>Home</strong><br/>&nbsp; &nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-house" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_PROFILE}>
                                <strong>Profile</strong><br/>&nbsp; &nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_SETTINGS}>
                                <strong style={{color:"black"}}>Settings</strong><br/>&nbsp; &nbsp; &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black"
                                     className="bi bi-gear" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger nav-link" onClick={onLogout}>
                                <strong style={{color: "red"}}>Logout</strong><br/>&nbsp; &nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red"
                                     className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                            </button>
                        </li>
                    </>
                )}
                </ul>
            </div>
        </nav>
    );
}
