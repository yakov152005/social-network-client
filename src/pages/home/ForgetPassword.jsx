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
import "../../css/LoadingStyle.css"
import "../../css/home/ForgetPasswordStyle.css"
import logo from "../../assets/image/lock-square-rounded_notFill.png";
import Swal from "sweetalert2";
import loader from "../../assets/form/loader.png"
import {IconMailFilled} from "@tabler/icons-react";


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
        if (!username || !emailForReset){
            await Swal.fire({
                title: "Error",
                text: "Please fill all fields.",
                icon: "error",
            });
            return;
        }

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
        <div className="auth-container-forget-password">
            <div className="left-section-forget-password">
                <div className="floating-form-forget-password">

                    {loading && (
                        <div className="loading-overlay">
                            <div className="loading-box">
                                <div className="spinner"></div>
                                <p>Wait a few seconds while the process is processed...
                                    <img src={loader} alt="Logo" style={{width: "25px", height: "25px"}}/>
                                </p>
                            </div>
                        </div>
                    )}

                    {!loading && (
                        <div>
                            <h3 className="form-title-forget-password">Reset Password</h3>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleChangeUser}
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
                                    type="text"
                                    className="form-control"
                                    id="emailReset"
                                    placeholder="Email"
                                    value={emailForReset}
                                    onChange={handleChangeMail}
                                    style={{paddingLeft: "3.5rem"}}
                                />
                                <label htmlFor="email" className="label-user"
                                       style={{paddingLeft: "3.5rem"}}>Email</label>
                                <div className="position-absolute icon-container" style={styleIcon}>
                                    <IconMailFilled stroke={2} style={styleI}/>
                                </div>
                                <div className="position-absolute" style={styleFinal}></div>
                            </div>

                            {errorMessage && (
                                <div className="error-message-forget-password"><strong>{errorMessage}</strong></div>
                            )}

                            <div className="d-grid">
                                <button className="btn btn-danger"
                                        type="button"
                                    /*disabled={!(emailForReset && username)} */
                                        onClick={handleClick}>
                                    Reset password
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

                                <div style={{marginTop: "10px"}}>
                                    <p style={{color: "gray", fontSize: "15px"}}>Is there any problem?&nbsp;
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

            <div className="right-section-forget-password">
                <div className="right-content-forget-password">
                    <img src={logo} alt="Logo" className="logo-forget-password"/>

                    <h2 className="help-title">🔐 Trouble Logging In?</h2>

                    <p className="help-text">
                        No worries! Enter your <strong>username</strong> and <strong>email address</strong>, and we'll send you instructions
                        to <strong>reset your password</strong> and get back to your account in no time.
                    </p>

                    <div className="steps">
                        <div className="step-item">
                            <i className="fas fa-user"></i> Enter your username
                        </div>
                        <div className="step-item">
                            <i className="fas fa-envelope"></i> Provide your email address
                        </div>
                        <div className="step-item">
                            <i className="fas fa-key"></i> Check your inbox
                            for submit reset instructions
                        </div>
                        <div className="step-item">
                        <i className="fas fa-smile"></i> Receive a new password by email and change it in your personal area after logging in.
                        </div>
                    </div>

                    <p className="support-text">
                        💡 Need extra help?
                         <a
                             href={MAILTO + MAIL_SERVICE}
                             className={"contact-link"}>
                               Contact Support
                         </a>
                    </p>
                </div>
            </div>

        </div>
    )
};