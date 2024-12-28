import React, {useState} from "react";
import axios from "axios";
import {NAV_LOGIN, TIME_LOADING, URL_RESET_PASSWORD, URL_SERVER_SIDE} from "../utils/Constants";
import {useNavigate} from "react-router-dom";
import "../css/LoginAndCreate.css"
import "../css/LoadingStyle.css"
import logo from "../assets/image/lock-square-rounded_notFill.png";


export default function ForgetPassword() {
    const [username, setUserName] = useState("");
    const [emailForReset, setEmailForReset] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleChangeMail = (event) => {
        setEmailForReset(event.target.value);
    };

    const handleChangeUser = (event) => {
        setUserName(event.target.value);
    };

    const handleClick = async () => {

        setLoading(true);

        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_RESET_PASSWORD + `/${emailForReset}&${username}`);
            if (response.data.success) {
                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);

                setTimeout(() => {
                    setLoading(false);
                    navigate(NAV_LOGIN);
                }, TIME_LOADING);
            } else {
                setErrorMessage(response.data.error);
                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
                setUserName("");
                setEmailForReset("");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error get request Email", error);
            setLoading(false);
        }

    };


    return (
        <div className="auth-container">
            <div className="left-section">
                <div className="floating-form">

                    {loading && (
                        <div className="loading-overlay">
                            <div className="loading-box">
                                <div className="spinner"></div>
                                <p>The new password has been sent to your email...
                                    <i className="bi bi-envelope-at"></i>
                                </p>
                            </div>
                        </div>
                    )}

                    {!loading && (
                        <div>
                            <h3 className="form-title">Reset Password</h3>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleChangeUser}
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailReset"
                                    placeholder="Email"
                                    value={emailForReset}
                                    onChange={handleChangeMail}
                                />
                                <label htmlFor="emailReset">Email</label>
                            </div>

                            {errorMessage && (
                                <div className="error-message"><strong>{errorMessage}</strong></div>
                            )}

                            <div className="d-grid">
                                <button className="btn btn-danger"
                                        type="button"
                                        disabled={!(emailForReset && username)}
                                        onClick={handleClick}>
                                    Reset password&nbsp;
                                    <i className="bi bi-envelope-at"></i>
                                </button>
                            </div>

                            <br/>

                            <div style={{color: "blue", margin: "5px", marginLeft: "123px"}}>
                                <a onClick={() => navigate(NAV_LOGIN)}
                                   className="custom-link"
                                   style={{
                                       cursor: "pointer",
                                       textDecoration: "underline",
                                       color: "blue",
                                       display: "inline-flex",
                                       alignItems: "center",
                                   }}>
                                    <strong>
                                        Back to login&nbsp;
                                        <i className="bi bi-arrow-right custom-arrow-icon"></i>
                                    </strong>
                                </a>
                            </div>

                        </div>
                    )}

                </div>
            </div>

            <div className="right-section">
                <img src={logo} alt="Logo" className="logo"/>
                <h4 className="site-info" style={{color:"black", font:"bold"}}><strong>Having trouble logging in?</strong></h4>
                <p className="site-info" style={{color: "white", fontSize:"14px"}}>
                    <strong>
                        Enter your username and your email address
                        and we'll send you a new password to get back into your account.
                    </strong>
                </p>
            </div>
        </div>
    )
}