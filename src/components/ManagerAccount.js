import React, { useState } from "react";
import {Routes, Route, NavLink, useNavigate, Navigate} from "react-router-dom";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
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
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        to="/createAccount"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        Create Account
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        to="/login"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        Login
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        to="/settingsPage"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        Settings Page
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                        to="/creator"
                        onClick={isLoggedIn ? handleDisabledClick : undefined}
                        aria-disabled={isLoggedIn ? "true" : "false"}
                    >
                        Creator
                    </NavLink>
                </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
                <Routes>
                    {/* ניווט ראשוני לLOGIN אשנה את זה בהמשך */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/createAccount" element={<CreateAccount/>}/>
                    <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout}/>}/>
                    <Route path="/settingsPage" element={<SettingsPage/>}/>
                    <Route path="/creator" element={<Creator/>}/>
                </Routes>
            </div>
        </div>
    );
}