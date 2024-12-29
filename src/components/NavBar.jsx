import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/image/iconSocialNetWorkTheOriginalOne.png';
import {
    NAV_CREATE_ACCOUNT,
    NAV_LOGIN,
    NAV_DASHBOARD,
    NAV_PROFILE,
    NAV_SETTINGS,
    NAV_CREATOR,
    NAV_SEARCH, NAV_MESSAGE
} from "../utils/Constants";
import { IconSearch ,IconMail } from '@tabler/icons-react';

export default function NavBar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand disabled" href="#" aria-disabled="true">
                    <img
                        src={logo} alt="NetWork" width="35" height="30"
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
                                    <i className="bi bi-person-vcard" style={{ fontSize: "17px" }} ></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_LOGIN}>
                                    <strong>Login</strong><br/>&nbsp; &nbsp;&nbsp;
                                    <i className="bi bi-box-arrow-right" style={{fontSize: "17px"}}></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_CREATOR}>
                                    <strong>Creator</strong><br/>&nbsp; &nbsp; &nbsp;
                                    <i className="bi bi-code" style={{fontSize: "17px"}}></i>
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
                                <i className="bi bi-house" style={{fontSize: "17px"}}></i>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_PROFILE}>
                                <strong>Profile</strong><br/>&nbsp; &nbsp;&nbsp;
                                <i className="bi bi-person-circle" style={{fontSize: "17px"}}></i>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_MESSAGE}>
                                <strong>Message</strong><br/>&nbsp; &nbsp; &nbsp;
                                <IconMail stroke={2} size={21}/>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_SEARCH}>
                                <strong>Search</strong><br/>&nbsp; &nbsp; &nbsp;
                                <IconSearch stroke={2} size={21}/>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                to={NAV_SETTINGS}>
                                <strong>Settings</strong><br/>&nbsp; &nbsp; &nbsp;
                                <i className="bi bi-gear" style={{fontSize: "17px"}}></i>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger nav-link" onClick={onLogout}>
                                <strong style={{color: "red"}}>Logout</strong><br/>&nbsp; &nbsp;&nbsp;
                                <i className="bi bi-box-arrow-right" style={{fontSize: "17px", color: "red"}}></i>
                            </button>
                        </li>
                    </>
                )}
                </ul>
            </div>
        </nav>
    );
}
