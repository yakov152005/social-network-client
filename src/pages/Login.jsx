import { useState } from "react";
import axios from "axios";
import {NAV_CREATE_ACCOUNT, NAV_FORGET_PASSWORD, URL_LOGIN_USER, URL_SERVER_SIDE, URL_VERIFY} from "../utils/Constants";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";



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

            if (response.data) {
                setIsVerification(true);
                setErrorMessage("");
                console.log("SMS sent with verification code.");
            } else {
                setErrorMessage("The username or password is incorrect.");
            }
        } catch (error) {
            console.error("Error logging in user", error);
            setErrorMessage("The username or password is incorrect.");
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
                        <div style={{color: "blue"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;New to Social-Network? &nbsp;
                            <a className="icon-link"
                               onClick={() => navigate(NAV_CREATE_ACCOUNT)}
                               style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}>
                                <strong> Sign Up!</strong>
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
