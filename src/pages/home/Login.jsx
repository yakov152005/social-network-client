import React, {useState} from "react";
import axios from "axios";
import {
    MAIL_SERVICE,
    MAILTO,
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
            await Swal.fire({
                title: "Error",
                text: "Please fill all fields.",
                icon: "error",
            });
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
                setErrorMessage("Invalid verification code.");
                console.log("Token not found")
                setLoadingVerification(false);
            }
        } catch (error) {
            console.error("Error verifying code", error);
            setErrorMessage("Failed to verify code. Please try again later.");
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
                                                    style={{paddingLeft: "3.5rem"}}
                                                />
                                                <label htmlFor="username" className="label-user"
                                                       style={{paddingLeft: "3.5rem"}}>Username</label>
                                                <div className="position-absolute icon-container" style={styleIcon}><i
                                                    className="fa-solid fa-user" style={styleI}></i></div>
                                                <div className="position-absolute" style={styleFinal}></div>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type={!showPassword ? "password" : "text"}
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    style={{paddingLeft: "3.5rem"}}
                                                />
                                                <label htmlFor="password" className="label-user"
                                                       style={{paddingLeft: "3.5rem"}}>Password</label>
                                                <div className="position-absolute icon-container" style={styleIcon}>
                                                    <i className="fa-sharp-duotone fa-solid fa-lock" style={styleI}></i>
                                                </div>
                                                <div className="position-absolute" style={styleFinal}></div>

                                                {formData.password.length > 0 &&
                                                    <img
                                                        src={!showPassword ? showPass : hidePass}
                                                        alt="Toggle Password Visibility"
                                                        className="toggle-password-icon-loading"
                                                        onClick={handleShowPassword}
                                                    />
                                                }
                                            </div>

                                            <>
                                                <a onClick={() => navigate(NAV_FORGET_PASSWORD)}
                                                   className="icon-link forgot-password-link">
                                                    <strong>Forgot password ?</strong>
                                                </a>
                                            </>


                                            {errorMessage && (
                                                <div className="error-message">
                                                    <strong>{errorMessage}</strong>
                                                </div>
                                            )}

                                            <div className="d-grid">
                                                <button className="btn btn-primary"
                                                        type="button"
                                                    /*disabled={!(formData.username && formData.password)} */
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

                                                <div style={{color: "gray", margin: "10px", marginLeft: "40px"}}>
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

                                            </div>

                                        </div>
                                    ) : (
                                        <div className="verification-form">
                                            <h4>Enter Verification Code</h4>
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
                                                <button className="btn btn-secondary" type="button" onClick={verifyCode}>
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
                        <div className="right-content">
                            <img src={logo} alt="Logo" className="logo"/>

                            <h2 className="welcome-title"> 🎉 Welcome Back!</h2>

                            <p className="site-info">Join a vibrant community and start creating unforgettable
                                experiences.</p>

                            <div className="features">
                                <div className="feature-item">
                                    <i className="bi bi-people"></i> Connect with friends & new people
                                </div>
                                <div className="feature-item">
                                    <i className="bi bi-chat"></i> Engage in meaningful conversations
                                </div>
                                <div className="feature-item">
                                    <i className="bi bi-images"></i> Share moments, photos, and stories
                                </div>
                                <div className="feature-item">
                                    <i className="bi bi-globe"></i> Explore trending topics & discussions
                                </div>
                            </div>

                            <p className="cta-text">💡Don’t have an account? <span
                                onClick={() => navigate(NAV_CREATE_ACCOUNT)} className="signup-link">Sign up now!</span>
                            </p>
                        </div>

                ) : (
                    <div className="verification-section">
                        <IconLockPassword stroke={1} size={"150px"} color={"#408091"}/>

                        <h2 className="verification-title">🔒 Secure Authentication Required</h2>

                        <p className="verification-text">
                            To protect your account, we require <strong>STRONG AUTHENTICATION</strong>
                        </p>

                        <div className="features">
                            <div className="feature-item">
                                <i className="fas fa-sms"></i> You will receive an SMS with a Verification code
                                shortly.
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-clock"></i> This process may take up to 2 minutes, depending on
                                your provider.
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-key"></i> Enter the CODE as soon as you receive it.
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-shield-alt"></i> Your security is our top priority! 🔐
                            </div>
                        </div>
                        <p className="verification-footer">
                            💡 Need help?
                            <a
                            href={MAILTO + MAIL_SERVICE}
                            className={"contact-link"}>
                            Contact Support
                            </a>
                        </p>
                    </div>

                )}
            </div>


        </div>
    );
}
