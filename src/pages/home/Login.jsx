import React, {useState} from "react";
import axios from "axios";
import {
    NAV_CREATE_ACCOUNT,
    NAV_FORGET_PASSWORD,
    TIME_LOADING,
    URL_LOGIN_USER,
    URL_SERVER_SIDE,
    URL_VERIFY
} from "../../utils/Constants";
import Cookies from "universal-cookie";
import { useNavigate} from "react-router-dom";
import logo from '../../assets/image/iconSocialNetWorkTheOriginalOne.png';
import showPass from "../../assets/form/show_password.png"
import hidePass from "../../assets/form/hide_password.png"
import { IconMoodCheck,IconLockPassword  } from '@tabler/icons-react';
import "../../css/home/LoginAndCreate.css"
import "../../css/LoadingStyle.css"
import Swal from "sweetalert2";



export default function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isVerification, setIsVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loadingVerification,setLoadingVerification] = useState(false);
    const [loadingLogin,setLoadingLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleVerificationChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    };

    const loginUser = async () => {
        if (!formData.username || !formData.password) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        setLoadingLogin(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_LOGIN_USER, {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.success) {

                setTimeout(() => {
                    setLoadingLogin(false);
                    setIsVerification(true);
                    setErrorMessage(response.data.error);
                    console.log(response.data.error);
                }, TIME_LOADING);

            } else {
                setErrorMessage(response.data.error);
                setLoadingLogin(false);
            }
        } catch (error) {
            console.error("Error logging in user", error);
            setErrorMessage("Error logging in user");
            setLoadingLogin(false);
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            //setErrorMessage("Please enter the verification code.");
            await Swal.fire({
                title: "Error",
                text: "Please enter the verification code.",
                icon: "error",
            });
            return;
        }

        setLoadingVerification(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_VERIFY, {
                username: formData.username,
                code: verificationCode,
            });
            //, maxAge: 3600

            if (response.data && response.data.token) {
                cookies.set("token", response.data.token, { path: "/"});
                console.log("Token:", response.data.token);


                setTimeout(() => {
                    Swal.fire({
                        title: "Verified!!",
                        text: "Success to login.",
                        icon: "success",
                    });
                    setLoadingVerification(false);
                    onLogin();
                }, TIME_LOADING);

            } else {
                await Swal.fire({
                    title: "Error",
                    text: "Invalid verification code.",
                    icon: "error",
                });
               // setErrorMessage("Invalid verification code.");
                console.log("Token not found")
                setLoadingVerification(false);
            }
        } catch (error) {
            console.error("Error verifying code", error);
            //setErrorMessage("Failed to verify code. Please try again later.");
            await Swal.fire({
                title: "Error",
                text: "Failed to verify code. Please try again later.",
                icon: "error",
            });
            setLoadingVerification(false);
        }
    };

    const styleIcon = {
        left: "0.8rem",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
    };
    const styleI = {fontSize: "1.2rem", color: "#6c757d"};
    const styleFinal = {
        left: "2.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        height: "1.5rem",
        width: "1px",
        backgroundColor: "#ddd",
    }

    return (
        <div className="auth-container">
            <div className="left-section">
                <div className="floating-form">

                    {loadingVerification && (
                        <div className="loading-overlay">
                            <div className="loading-box">
                                <div className="spinner"></div>
                                <p>Verification successful! Wait a few moments...
                                    <IconMoodCheck stroke={2}/>
                                </p>
                            </div>
                        </div>
                    )}

                    {loadingLogin && (
                        <div className="loading-overlay">
                            <div className="loading-box">
                                <div className="spinner"></div>
                                <p>SMS sent with verification code! Wait a few moments...
                                    <IconMoodCheck stroke={2}/>
                                </p>
                            </div>
                        </div>
                    )}

                    {!loadingVerification && (
                        <div>
                            {!loadingLogin && (
                                <div>
                                    {!isVerification ? (
                                        <div>
                                            <h3 className="form-title">Login</h3>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="username"
                                                    placeholder="Username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="username">Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type={!showPassword ? "password" : "text"}
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="password">Password</label>

                                                {formData.password.length > 0 &&
                                                    <img
                                                        src={!showPassword ? showPass : hidePass}
                                                        alt="Toggle Password Visibility"
                                                        className="toggle-password-icon-loading"
                                                        onClick={handleShowPassword}
                                                    />
                                                }

                                            </div>

                                            {errorMessage && (
                                                <div className="error-message">
                                                    <strong>{errorMessage}</strong>
                                                </div>
                                            )}

                                            <div className="d-grid">
                                                <button className="btn btn-primary"
                                                        type="button"
                                                        disabled={!(formData.username && formData.password)}
                                                        onClick={loginUser}
                                                >
                                                    Login
                                                </button>
                                            </div>

                                            <div style={{marginTop: "22px"}}>
                                                <br/>
                                                <div className={"divider-container"}>
                                                    <hr className={"divider"}/>
                                                    <p className={"or-text"}>or</p>
                                                    <hr className={"divider"}/>
                                                </div>

                                                <div style={{color: "blue", margin: "10px", marginLeft: "40px"}}>
                                                    New to Social-Network?
                                                    <a className="custom-link"
                                                       onClick={() => navigate(NAV_CREATE_ACCOUNT)}
                                                       style={{
                                                           cursor: "pointer",
                                                           textDecoration: "underline",
                                                           color: "blue",
                                                           display: "inline-flex",
                                                           alignItems: "center",
                                                           marginLeft: "10px"
                                                       }}>
                                                        <strong> Sign Up
                                                            <i className="bi bi-arrow-right custom-arrow-icon"></i>
                                                        </strong>
                                                    </a>
                                                </div>

                                                <div style={{color: "red"}}>
                                                    <a onClick={() => navigate(NAV_FORGET_PASSWORD)}
                                                       className="icon-link"
                                                       style={{
                                                           cursor: "pointer",
                                                           textDecoration: "underline",
                                                           color: "red",
                                                           display: "inline-flex",
                                                           alignItems: "center",
                                                           marginLeft: "100px"
                                                       }}>
                                                        <strong>
                                                            Forgot password&nbsp;
                                                            <i className="bi bi-question"></i>
                                                        </strong>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        <div className="verification-form">
                                            <h4 className="verification-title">Enter Verification Code</h4>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="verification"
                                                    placeholder="Verification Code"
                                                    value={verificationCode}
                                                    onChange={handleVerificationChange}
                                                    style={{paddingLeft: "3.5rem"}}
                                                />
                                                <label htmlFor="verification" style={{paddingLeft: "3.5rem"}}>
                                                    Verification Code
                                                </label>
                                                <div className="position-absolute icon-container" style={styleIcon}>
                                                    <i className="fa-sharp-duotone fa-solid fa-lock" style={styleI}></i>
                                                </div>
                                                <div className="position-absolute" style={styleFinal}></div>
                                            </div>

                                            {errorMessage && (
                                                <div className="error-message">
                                                    <strong>{errorMessage}</strong>
                                                </div>
                                            )}

                                            <div className="d-grid">
                                                <button className="btn btn-primary" type="button" onClick={verifyCode}>
                                                    Verify Code
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>


            <div className="right-section">
                {!isVerification ? (
                    <div>
                        <img src={logo} alt="Logo" className="logo"/>
                        <p className="site-info"
                           style={{color: "black", fontFamily: 'Brush Script MT', marginLeft: "40px"}}>
                            Welcome back, log in to continue creating new experiences.
                        </p>
                    </div>

                ) : (
                    <div >
                        <IconLockPassword stroke={1} size={"200px"} color={"black"}/>
                        <h2 style={{color:"red"}}>Please note!</h2>
                        <p className="site-info-verification">
                            The requested resource requires a strong level of authentication. In order to verify your
                            identity,
                            an SMS with an Authentication Code will be sent to your mobile phone (in the next few
                            minutes).
                        </p>
                        <p className="site-info-verification">
                            You must wait until the SMS is received on your mobile device.
                            The duration depends on the mobile provider and usually takes about 2 minutes.
                        </p>
                    </div>
                )}
            </div>


        </div>
    );
}
