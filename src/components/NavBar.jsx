import React from "react";
import { NavLink } from "react-router-dom";
import {NAV_CREATE_ACCOUNT, NAV_LOGIN, NAV_DASHBOARD, NAV_PROFILE, NAV_SETTINGS, NAV_CREATOR} from "../Utils/Constants";

export default function NavBar({ isLoggedIn, onLogout }) {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand disabled" href="#" aria-disabled="true">
                    <img
                        src="/image/logoNetWork.png" alt="NetWork" width="35" height="30"
                        className="d-inline-block align-text-top rounded"/>
                    <strong>Social-Network</strong>
                </a>

                <ul className="nav nav-pills mb-3">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_CREATE_ACCOUNT}>
                                  <strong> Create Account</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_LOGIN}>
                                    <strong>Login</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_SETTINGS}>
                                    <strong>Settings</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_CREATOR}>
                                    <strong>Creator</strong>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_DASHBOARD}>
                                    <strong>Home</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                                    to={NAV_PROFILE}>
                                    <strong>Profile</strong>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger nav-link" onClick={onLogout}>
                                    <strong style={{color:"red"}}>Logout</strong>
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
