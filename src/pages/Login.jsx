import { useState } from "react";
import axios from "axios";
import { URL_SERVER_SIDE } from "../Utils/Constants";
import DashboardPage from "../components/DashboardPage";



export default function Login({ onLogin , onLogout}) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [isVerification, setIsVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");


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
            const response = await axios.post(URL_SERVER_SIDE + "/loginUser", {
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
            setErrorMessage("Failed to log in.");
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            setErrorMessage("Please enter the verification code.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + "/verifyCode", {
                username: formData.username,
                code: verificationCode,
            });

            if (response.data) {
                setIsLogin(true);
                onLogin();
                setTimeout(()=> { alert("Verification successful!")},1000)
                console.log("Verification successful!");
            } else {
                setErrorMessage("Invalid verification code.");
            }
        } catch (error) {
            console.error("Error verifying code", error);
            setErrorMessage("Failed to verify code. Please try again later.");
        }
    };

    const handleLogout = () => {
        reset();
    }

    const reset = () => {
        setIsLogin(false);
        onLogin();
        onLogout();
        setIsVerification(false)
        setVerificationCode("")
        setFormData(
            {
                username: "",
                password: ""
            }
        )
    }

    return (
        <div className="auth-container">
            <div className="floating-form">

                {!isLogin ? (
                    !isVerification ? (
                        <div>
                            <h3 className="form-title">Login</h3>

                            <div className="form-floating mb-3">
                                <input
                                    type={"text"}
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

                            {errorMessage && <div className="error-message"><strong>{errorMessage}</strong></div>}

                            <div className="d-grid">
                                <button
                                    className={"btn btn-primary"}
                                    type="button"
                                    onClick={loginUser}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h4>Enter Verification Code</h4>
                            <div className="form-floating mb-3">
                                <input
                                    type={"text"}
                                    className="form-control"
                                    id="verification"
                                    placeholder="enter verification code"
                                    value={verificationCode}
                                    onChange={handleVerificationChange}
                                />
                                <label htmlFor="verification">Verification Code</label>
                            </div>

                            {errorMessage && <div className="error-message"><strong>{errorMessage}</strong></div>}

                            <div className="d-grid">
                                <button
                                    className={"btn btn-primary"}
                                    type="button"
                                    onClick={verifyCode}
                                >
                                    Verify Code
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <div>
                        <DashboardPage onLogout={handleLogout} userName={formData.username}/>
                    </div>

                )}
            </div>
        </div>
    );
}

