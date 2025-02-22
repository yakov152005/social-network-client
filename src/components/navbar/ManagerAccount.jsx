import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import CreateAccount from "../../pages/home/CreateAccount";
import Login from "../../pages/home/Login";
import Creator from "../../pages/home/Creator";
import Dashboard from "../../pages/dashboard/Dashboard";
import Cookies from "universal-cookie";
import {
    NAV_ACCESSIBILITY,
    NAV_CHANGE_PASSWORD,
    NAV_CREATE_ACCOUNT,
    NAV_CREATOR,
    NAV_DASHBOARD, NAV_DEFAULT, NAV_DELETE_USER,
    NAV_ERROR, NAV_FORGET_PASSWORD,
    NAV_LOGIN, NAV_MESSAGE, NAV_NOTIFICATION,
    NAV_PROFILE, NAV_PROFILE_SEARCH, NAV_SEARCH, NAV_SETTINGS, NAV_TERM_AND_PRIVACY,
    PATH
} from "../../utils/Constants";
import NotFoundPage from "../../pages/NotFoundPage";
import NavBar from "./NavBar";
import Profile from "../../pages/dashboard/Profile";
import ForgetPassword from "../../pages/home/ForgetPassword";
import Settings from "../../pages/settings/Settings";
import ChangePassword from "../../pages/settings/ChangePassword";
import Search from "../../pages/dashboard/Search";
import ProfileSearch from "../../pages/dashboard/ProfileSearch";
import Message from "../../pages/dashboard/Message";
import DeleteUser from "../../pages/settings/DeleteUser";
import Notification from "../../pages/dashboard/Notification";
import {useEffect, useState} from "react";
import ValidateToken from "../../api/ValidateToken";
import ConfirmResetPasswordPage from "../../pages/home/ConfirmResetPasswordPage";
import Footer from "./Footer";
import AccessibilityStatement from "../websiteRegulations/AccessibilityStatement";
import TermsAndPrivacy from "../websiteRegulations/TermsAndPrivacy";


export default function ManagerAccount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    const location = useLocation();
    console.log("home page token check", token);
    const [username, setUsername] = useState("");

    const fetchToken = async ()=> {
        try {
            const api = new ValidateToken();
            await api.validateTokenApi(token,navigate,cookies,setUsername);
        }catch (error){
            console.log("Error to fetching token",error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchToken();
            console.log("home page token check", token);
            console.log("Username passed to manger:", username);
        }
    }, [token, navigate, cookies,username]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    const handleLogout = () => {
        cookies.remove("token", {path: PATH});
        navigate(NAV_LOGIN);
    };

    return (
        <div className="App">
            <div className="background"> </div>
                <NavBar isLoggedIn={!!token} onLogout={handleLogout}/>

            <div className="content-wrapper">
                <div className="content">
                    <Routes>

                        <Route path={NAV_ACCESSIBILITY} element={<AccessibilityStatement />} />
                        <Route path={NAV_TERM_AND_PRIVACY} element={<TermsAndPrivacy />} />

                        {!token && (
                            <>
                                <Route path={NAV_DEFAULT} element={<Navigate to={NAV_LOGIN}/>}/>
                                <Route path={NAV_CREATE_ACCOUNT} element={<CreateAccount/>}/>
                                <Route path={NAV_LOGIN} element={<Login onLogin={() => navigate(NAV_DASHBOARD)}/>}/>
                                <Route path={NAV_CREATOR} element={<Creator/>}/>
                                <Route path={NAV_FORGET_PASSWORD} element={<ForgetPassword/>}/>
                                <Route path={"/confirm-reset"} element={<ConfirmResetPasswordPage/>}/>
                                <Route path={NAV_ERROR} element={<NotFoundPage/>}/>
                            </>
                        )}
                        {token && (
                            <>
                                <Route path={NAV_DASHBOARD} element={<Dashboard/>}/>
                                <Route path={NAV_PROFILE} element={<Profile/>}/>
                                <Route path={NAV_SEARCH} element={<Search/>}/>
                                <Route path={NAV_PROFILE_SEARCH} element={<ProfileSearch/>}/>
                                <Route path={NAV_MESSAGE} element={<Message/>}/>
                                <Route path={NAV_SETTINGS} element={<Settings/>}/>
                                <Route path={NAV_CHANGE_PASSWORD} element={<ChangePassword/>}/>
                                <Route path={NAV_DELETE_USER} element={<DeleteUser/>}/>
                                <Route path={NAV_NOTIFICATION} element={<Notification/>}/>
                                <Route path={NAV_ERROR} element={<NotFoundPage/>}/>
                            </>
                        )}
                    </Routes>
                </div>

            </div>
           <>
               {!token &&
                   <Footer />
               }
           </>
        </div>
    );
}
