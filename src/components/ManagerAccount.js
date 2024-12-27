import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import Creator from "../pages/Creator";
import Dashboard from "../pages/Dashboard";
import Cookies from "universal-cookie";
import {
    NAV_CHANGE_PASSWORD,
    NAV_CREATE_ACCOUNT,
    NAV_CREATOR,
    NAV_DASHBOARD, NAV_DEFAULT,
    NAV_ERROR, NAV_FORGET_PASSWORD,
    NAV_LOGIN,
    NAV_PROFILE, NAV_SETTINGS,
    PATH
} from "../utils/Constants";
import NotFoundPage from "../pages/NotFoundPage";
import NavBar from "./NavBar";
import Profile from "../pages/Profile";
import ForgetPassword from "../pages/ForgetPassword";
import Settings from "../pages/Settings";
import ChangePassword from "../pages/ChangePassword";

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
            <NavBar isLoggedIn={!!token} onLogout={handleLogout} />

            <div className="tab-content" id="pills-tabContent">
                <Routes>
                    {!token && (
                        <>
                            <Route path={NAV_DEFAULT} element={<Navigate to={NAV_LOGIN}/>}/>
                            <Route path={NAV_CREATE_ACCOUNT} element={<CreateAccount />} />
                            <Route path={NAV_LOGIN} element={<Login onLogin={() => navigate(NAV_DASHBOARD)} />} />
                            <Route path={NAV_CREATOR} element={<Creator />} />
                            <Route path={NAV_FORGET_PASSWORD} element={<ForgetPassword/>} />
                            <Route path={NAV_ERROR} element={<NotFoundPage />} />
                        </>
                    )}
                    {token && (
                        <>
                            <Route path={NAV_DASHBOARD} element={<Dashboard/>} />
                            <Route path={NAV_PROFILE} element={<Profile />} />
                            <Route path={NAV_SETTINGS} element={<Settings />} />
                            <Route path={NAV_CHANGE_PASSWORD} element={<ChangePassword />} />
                            <Route path={NAV_ERROR} element={<NotFoundPage />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
}
