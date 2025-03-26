import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import CreateAccount from "../../pages/home/CreateAccount";
import Login from "../../pages/home/Login";
import Creator from "../../pages/home/Creator";
import Dashboard from "../../pages/dashboard/Dashboard";
import Cookies from "universal-cookie";
import {
    NAV_ACCESSIBILITY,
    NAV_CONFIRM_RESET,
    NAV_CREATE_ACCOUNT,
    NAV_CREATOR,
    NAV_DASHBOARD,
    NAV_DEFAULT,
    NAV_ERROR,
    NAV_FORGET_PASSWORD,
    NAV_LOGIN,
    NAV_MESSAGE,
    NAV_PROFILE,
    NAV_PROFILE_SEARCH,
    NAV_SETTINGS,
    NAV_TERM_AND_PRIVACY,
    URL_SERVER_SIDE,
    PATH
} from "../../utils/Constants";
import NotFoundPage from "../../pages/NotFoundPage";
import NavBar from "./NavBar";
import Profile from "../../pages/dashboard/Profile";
import ForgetPassword from "../../pages/home/ForgetPassword";
import Settings from "../../pages/settings/Settings";
import ProfileSearch from "../../pages/dashboard/ProfileSearch";
import Message from "../../pages/dashboard/Message";
import {useEffect, useState} from "react";
import ValidateToken from "../../api/ValidateToken";
import ConfirmResetPasswordPage from "../../pages/home/ConfirmResetPasswordPage";
import Footer from "./Footer";
import AccessibilityStatement from "../websiteRegulations/AccessibilityStatement";
import TermsAndPrivacy from "../websiteRegulations/TermsAndPrivacy";
import LoadingScreen from "../loaders/LoadingScreen";
import axios from "axios";
import Swal from "sweetalert2";


export default function ManagerAccount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const navigate = useNavigate();
    const location = useLocation();
    console.log("home page token check", token);
    const [username, setUsername] = useState("");
    const [isLoadedDash, setIsLoadedDash] = useState(false);
    const [loading, setLoading] = useState(false);

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


    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await axios.get(URL_SERVER_SIDE +`/online-friends/disconnect/${username}`);
            if (response.data.success){
                await Swal.fire({
                    title: "Logged out successfully!",
                    text: response.data.error,
                    icon: "success",
                    background: "#1a1a2e",
                    color: "#ffffff",
                    confirmButtonColor: "#5269bc",
                    customClass: {
                        popup: "swal-custom-popup",
                        container: "swal2-container",
                        title: "swal-custom-title",
                        confirmButton: "swal-custom-confirm",
                    }
                });
                cookies.remove("token", {path: PATH});
                navigate(NAV_LOGIN);
            } else {
                console.log(response.data.error);
            }
        }catch (error){
            console.log("Error to logout. ", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading){
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="w-16 h-16 border-4 border-white border-dotted rounded-full animate-spin"></div>
                <span className="text-white ml-4 text-lg">Logging out...</span>
            </div>
        )
    }

    return (
        <div className="App">
            <div className="background"></div>
            <NavBar isLoggedIn={!!token} onLogout={handleLogout}/>

            {!isLoadedDash && <LoadingScreen onLoaded={() => setIsLoadedDash(true)}/>}

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
                                <Route path={NAV_CONFIRM_RESET} element={<ConfirmResetPasswordPage/>}/>
                                <Route path={NAV_ERROR} element={<NotFoundPage/>}/>
                            </>
                        )}
                        {token && (
                            <>
                                <Route path={NAV_DASHBOARD} element={ isLoadedDash && <Dashboard/> }/>
                                <Route path={NAV_PROFILE} element={<Profile/>}/>
                                <Route path={NAV_PROFILE_SEARCH} element={<ProfileSearch/>}/>
                                <Route path={NAV_MESSAGE} element={<Message/>}/>
                                <Route path={NAV_SETTINGS} element={<Settings/>}/>
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