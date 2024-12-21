import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import SettingsPage from "../pages/SettingsPage";
import Creator from "../pages/Creator";
import DashboardPage from "../pages/DashboardPage";
import Cookies from "universal-cookie";
import {
    NAV_CREATE_ACCOUNT,
    NAV_CREATOR,
    NAV_DASHBOARD,
    NAV_LOGIN,
    NAV_PROFILE,
    NAV_SETTINGS,
    PATH
} from "../Utils/Constants";
import NotFoundPage from "../pages/NotFoundPage";
import NavBar from "./NavBar";
import Profile from "../pages/Profile";

export default function ManagerAccount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    console.log("home page token check", token);

    const handleLogout = () => {
        cookies.remove("token", { path: PATH });
        navigate(NAV_LOGIN);
    };

    return (
        <div className="App container mt-4">
            {/* שימוש ב-NavBar דינמי */}
            <NavBar isLoggedIn={!!token} onLogout={handleLogout} />

            <div className="tab-content" id="pills-tabContent">
                <Routes>
                    {/* אם אין טוקן, המשתמש יכול לגשת רק לעמודי Login, CreateAccount, וכו' */}
                    {!token && (
                        <>
                            <Route path="/" element={<Navigate to={NAV_LOGIN}/>}/>
                            <Route path={NAV_CREATE_ACCOUNT} element={<CreateAccount />} />
                            <Route path={NAV_LOGIN} element={<Login onLogin={() => navigate(NAV_DASHBOARD)} />} />
                            <Route path={NAV_SETTINGS} element={<SettingsPage />} />
                            <Route path={NAV_CREATOR} element={<Creator />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </>
                    )}
                    {/* אם יש טוקן, המשתמש מועבר ל-Dashboard */}
                    {token && (
                        <>
                            <Route path={NAV_DASHBOARD} element={<DashboardPage/>} />
                            <Route path={NAV_PROFILE} element={<Profile />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
}
