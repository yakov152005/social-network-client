import { useState } from "react";
import axios from "axios";
import {NAV_CREATE_ACCOUNT, NAV_FORGET_PASSWORD, URL_LOGIN_USER, URL_SERVER_SIDE, URL_VERIFY} from "../utils/Constants";
import Cookies from "universal-cookie";
import { useNavigate} from "react-router-dom";



export default function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isVerification, setIsVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

    const cookies = new Cookies();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleVerificationChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const loginUser = async () => {
        if (!formData.username || !formData.password) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_LOGIN_USER, {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.success) {
                setIsVerification(true);
                setErrorMessage(response.data.error);
                console.log(response.data.error);
            } else {
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            console.error("Error logging in user", error);
            setErrorMessage("Error logging in user");
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            setErrorMessage("Please enter the verification code.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_VERIFY, {
                username: formData.username,
                code: verificationCode,
            });
            //, maxAge: 3600

            if (response.data && response.data.token) {
                cookies.set("token", response.data.token, { path: "/"});
                console.log("Token:", response.data.token);
                onLogin();
                alert("Verification successful!");
            } else {
                setErrorMessage("Invalid verification code.");
                console.log("Token not found")
            }
        } catch (error) {
            console.error("Error verifying code", error);
            setErrorMessage("Failed to verify code. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <div className="floating-form">
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
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        {errorMessage && (
                            <div className="error-message">
                                <strong>{errorMessage}</strong>
                            </div>
                        )}
                        <div className="d-grid">
                            <button className="btn btn-primary" type="button" onClick={loginUser}>
                                Login
                            </button>
                        </div>

                        <br></br>
                        <div className={"leftRight"} style={{color: "blue"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;New to Social-Network? &nbsp;
                            <a className="icon-link"
                               onClick={() => navigate(NAV_CREATE_ACCOUNT)}
                               style={{cursor: "pointer", textDecoration: "underline", color: "blue", display: "inline-flex", alignItems: "center",}}>
                                <strong> Sign Up
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-exclamation-lg"
                                        viewBox="0 0 16 16"
                                        style={{
                                            transition: "transform 0.3s ease",
                                        }}
                                    >
                                        <path
                                            d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/>
                                    </svg>
                                </strong>
                            </a>
                        </div>

                        <div style={{color: "red"}}>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <a className="icon-link"
                               onClick={() => navigate(NAV_FORGET_PASSWORD)}
                               style={{cursor: "pointer", textDecoration: "underline", color: "red"}}>
                                <strong>Forgot password?</strong>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>Enter Verification Code</h4>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="verification"
                                placeholder="Verification Code"
                                value={verificationCode}
                                onChange={handleVerificationChange}
                            />
                            <label htmlFor="verification">Verification Code</label>
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
        </div>
    );
}
