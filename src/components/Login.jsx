import { useState } from "react";
import axios from "axios";
import { URL_SERVER_SIDE } from "../Utils/Constants";
import DashboardPage from "./DashboardPage";



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
        <div className={"user-style-div"}>
            {!isLogin ? (
                !isVerification ? (
                    <div>
                        <h4>Login</h4>
                        <div className={"user-style"}>
                            <strong>Username:</strong>
                            <input
                                placeholder="enter username"
                                onChange={handleChange}
                                id="username"
                                value={formData.username}
                            />
                        </div>

                        <div className={"user-style"}>
                            <strong>Password:</strong>
                            <input
                                placeholder="enter password"
                                type="password"
                                onChange={handleChange}
                                id="password"
                                value={formData.password}
                            />
                        </div>

                        {errorMessage && <div className="error">{errorMessage}</div>}

                        <div className={"user-style"}>
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
                        <div className={"user-style"}>
                            <strong>Code:</strong>
                            <input
                                placeholder="enter verification code"
                                onChange={handleVerificationChange}
                                value={verificationCode}
                            />
                        </div>

                        {errorMessage && <div className="error-message" >{errorMessage}</div>}

                        <div className={"user-style"}>
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
    );
}

