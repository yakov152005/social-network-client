import React, {useState} from "react";
import axios from "axios";
import {
    MAIL_SERVICE,
    MAILTO,
    NAV_LOGIN,
    URL_RESET_PASSWORD,
    URL_SERVER_SIDE
} from "../../utils/Constants";
import {useNavigate} from "react-router-dom";
import "../../css/home/LoginAndCreate.css"
import "../../css/LoadingStyle.css"
import "../../css/home/ForgetPasswordStyle.css"
import logo from "../../assets/image/lock-square-rounded_notFill.png";
import Swal from "sweetalert2";
import loader from "../../assets/form/loader.png"


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

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Before you reset your password, make sure you remember your email password and that you are confident in this process.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Reset it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const response = await axios.get(URL_SERVER_SIDE + URL_RESET_PASSWORD + `/${emailForReset}&${username}`);
                if (response.data.success) {
                    Swal.fire({
                        title: "Success!",
                        html: "The new password has been sent to your email... <i class='bi bi-envelope-at'></i>",
                        icon: "success",
                    });
                    console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
                    setTimeout(() => {
                        setLoading(false);
                        navigate(NAV_LOGIN);
                    }, 50);
                } else {
                    //Swal.fire("Error", response.data.error, "error");
                    setErrorMessage(response.data.error);
                    console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
                    setUserName("");
                    setEmailForReset("");
                    setLoading(false);
                }
            } catch (error) {
                Swal.fire("Error", "Failed to reset password.", "error");
                setErrorMessage("Failed to reset password.");
                console.error("Error get request Email", error);
                setLoading(false);
            }
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
                                <p>Wait a few seconds while the process is processed...
                                    <img src={loader} alt="Logo" style={{width:"25px",height:"25px"}}/>
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


                            <div style={{marginTop: "30px", textAlign: "center"}}>
                                <div className={"divider-container"}>
                                    <hr className={"divider"}/>
                                    <p className={"or-text"}>or</p>
                                    <hr className={"divider"}/>
                                </div>

                                <div style={{color: "green"}}>
                                    <a onClick={() => navigate(NAV_LOGIN)}
                                       className="custom-link"
                                       style={{
                                           cursor: "pointer",
                                           textDecoration: "underline",
                                           color: "green",
                                           display: "inline-flex",
                                           alignItems: "center",
                                       }}>
                                        <strong>
                                            Back to login&nbsp;
                                            <i className="bi bi-arrow-right custom-arrow-icon"></i>
                                        </strong>
                                    </a>
                                </div>

                                <div style={{marginTop:"10px"}}>
                                    <p style={{color:"green" , fontSize:"15px"}}>Is there any problem?&nbsp;
                                        <a
                                            href={MAILTO + MAIL_SERVICE}
                                            className={"a-link-forget"}>
                                            <strong>
                                                Contact us!
                                            </strong>
                                        </a>
                                    </p>
                                </div>
                            </div>


                        </div>
                    )}

                </div>
            </div>

            <div className="right-section">
                <img src={logo} alt="Logo" className="logo"/>
                <h4 className="site-info" style={{color: "black", font: "bold"}}><strong>Having trouble logging
                    in?</strong></h4>
                <p className="site-info" style={{color: "white", fontSize: "14px"}}>
                    <strong>
                        Enter your username and your email address
                        and we'll send you a new password to get back into your account.
                    </strong>
                </p>
            </div>
        </div>
    )
};