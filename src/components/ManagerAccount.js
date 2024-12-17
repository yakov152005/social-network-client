import React, { useState } from "react";
import {Routes, Route, NavLink, useNavigate, Navigate} from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import SettingsPage from "./SettingsPage";
import Creator from "./Creator";

export default function ManagerAccount() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/createAccount");
    };

    const navigate = useNavigate();
    const handleDisabledClick = (e) => {e.preventDefault();};

    return (
        <div className="App container mt-4">
            <div>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            className="navbar-brand disabled" href="#"  aria-disabled="true">
                            <img src="/image/logoNetWork.png" alt="NetWork" width="35" height="30" className="d-inline-block align-text-top"/>
                            <strong>Social-Network</strong>
                        </a>
                    </div>
                </nav>
            </div>

            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                        to="/createAccount"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        <strong>Create Account</strong>
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                        to="/login"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        <strong>Login</strong>
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                        to="/settingsPage"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        <strong>Settings Page</strong>
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
                        to="/creator"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        <strong>Creator</strong>
                    </NavLink>
                </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
                <Routes>
                    {/* ניווט ראשוני לLOGIN אשנה את זה בהמשך */}
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="/createAccount" element={<CreateAccount/>}/>
                    <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout}/>}/>
                    <Route path="/settingsPage" element={<SettingsPage/>}/>
                    <Route path="/creator" element={<Creator/>}/>
                </Routes>
            </div>
        </div>
    );
}