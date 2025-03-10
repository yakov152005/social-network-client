import React, {useState} from "react";
import axios from "axios";
import {
    NAV_CREATE_ACCOUNT,
    NAV_LOGIN,
    TIME_LOADING,
    URL_CREATE_USER,
    URL_SERVER_SIDE
} from "../../utils/Constants";
import "../../css/home/LoginAndCreate.css";
import "../../css/loaders/LoadingGeneralStyle.css"
import logo from '../../assets/image/iconSocialNetWorkTheOriginalOne.png';
import {useNavigate} from "react-router-dom";
import {IconLockCheck, IconDeviceMobileFilled, IconMailFilled, IconBalloonFilled,IconMoodCheck } from '@tabler/icons-react';
import showPass from "../../assets/form/show_password.png"
import hidePass from "../../assets/form/hide_password.png"
import Swal from "sweetalert2";
import TermsAgreement from "../../components/home/TermsAgreement";
import "../../css/PopupStyle.css"




export default function CreateAccount() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmRadio,setConfirmRadio] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
        email: "",
        age: 0,
    });

    const [validation, setValidation] = useState({
        username: false,
        password: false,
        passwordConfirm: false,
        phoneNumber: false,
        email: false,
        age: false,
    });

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleShowConfirmPassword = () =>{
        setShowConfirmPassword(prevState => !prevState);
    }


    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});


        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value.length >= 2,
                }));
                break;

            case "password": {
                const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
                const letterUpper = /[A-Z]/.test(value);
                const letterLower = /[a-z]/.test(value);
                const numbers = /[0-9]/.test(value);

                setValidation((prev) => ({
                    ...prev,
                    password: value.length >= 8 && ((letterLower || letterUpper) && hasSpecialChar && numbers),
                }));
                break;
            }

            case "passwordConfirm": {
                setValidation((prev) => ({
                    ...prev,
                    passwordConfirm: value === formData.password
                }));
                break;
            }

            case "phoneNumber": {
                const isValidPhone = value.startsWith("05") && value.length === 10;
                setValidation((prev) => ({
                    ...prev,
                    phoneNumber: isValidPhone,
                }));
                break;
            }

            case "email": {
                const validDomains = [
                    "@walla.co.il",
                    "@walla.com",
                    "@gmail.co.il",
                    "@gmail.com",
                    "@aac.ac.co.il",
                    "@aac.ac.com",
                ];
                const isValidEmail = validDomains.some((domain) => value.includes(domain));
                setValidation((prev) => ({
                    ...prev,
                    email: isValidEmail,
                }));
                break;
            }

            case "age": {
                const ageNumber = parseInt(value, 10);
                const isValidAge = ageNumber > 0 && ageNumber <= 120;
                setValidation((prev) => ({
                    ...prev,
                    age: isValidAge,
                }));
                break;
            }

            default:
                break;
        }
    };


    const createAccount = async () => {
        const {username, password, passwordConfirm, phoneNumber, email, age} = formData;


        if (!confirmRadio){
            await Swal.fire({
                title: "Please note",
                text: "You must agree to the site terms and conditions.",
                icon: "info",
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
            return;
        }

        if (!username || !password || !passwordConfirm || !phoneNumber || !email || age <= 0) {
            await Swal.fire({
                title: "Error",
                text: "Please fill all fields.",
                icon: "error",
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
            return;
        }

        if (username.length < 2){
            setFormData((prevFormData) => ({
                ...prevFormData,
                username: "",
            }));
            setErrorMessage("Username must be at least 2 characters.");
            return;
        }


        setLoading(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CREATE_USER, {
                username,
                password,
                passwordConfirm,
                phoneNumber,
                email,
                age: parseInt(age, 10),
            });
            if (response.data.success) {

                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }`);
                setFormData({
                    username: "",
                    password: "",
                    passwordConfirm: "",
                    phoneNumber: "",
                    email: "",
                    age: 0,
                });

                setTimeout(() => {
                    Swal.fire({
                        title: "Good job!",
                        text: "Success to add user. Email has been sent with all your details..",
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
                    setLoading(false);
                    navigate(NAV_LOGIN);
                }, TIME_LOADING);

            } else {
                const errorCode = response.data.errorCode;
                const fieldToClear = switchError(errorCode);
               /*
                await Swal.fire({
                    title: "Error",
                    text: response.data.error,
                    icon: "error",
                });
                */
                setErrorMessage(response.data.error);
                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} } , errorCode: { ${errorCode}`);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldToClear]: "",
                }));
                setConfirmRadio(false);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error creating user", error);
           /*
            await Swal.fire({
                title: "Error",
                text: "Failed to create user. Please try again later.",
                icon: "error",
            });
            */
            setErrorMessage("Failed to create user. Please try again later.");
            setConfirmRadio(false);
            setLoading(false);
        }
    };

    const switchError = (errorCode) => {
        switch (errorCode) {
            case 2:
                return "username";
            case 3:
                return "password";
            case 4:
                return "passwordConfirm";
            case 5:
                return "phoneNumber";
            case 6:
                return "email";
            default:
                return null;
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

                    {loading && (
                        <div className="loading-overlay">
                            <div className="loading-box">
                                <div className="spinner"></div>
                                <p>Creating your account, please wait...
                                    <IconMoodCheck stroke={2}/>
                                </p>
                            </div>
                        </div>
                    )}

                    {!loading && (
                        <>
                            <div className="left-section">
                                <div className="floating-form">
                                    <h3 className="form-title">Create Account</h3>

                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type="text"
                                            className={`form-control ${formData.username === "" ? "" : validation.username ? 'is-valid' : 'is-invalid'}`}
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
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Username must be at least 2 characters.</div>
                                    </div>


                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            style={{paddingLeft: "3.5rem"}}
                                            type={!showPassword ? "password" : "text"}
                                            className={`form-control ${formData.password === "" ? "" : validation.password ? 'is-valid' : 'is-invalid'}`}
                                            id="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="password" className="label-user"
                                               style={{paddingLeft: "3.5rem"}}>Password</label>
                                        <div className="position-absolute icon-container" style={styleIcon}>
                                            <i className="fa-sharp-duotone fa-solid fa-lock" style={styleI}></i>
                                        </div>
                                        <div className="position-absolute" style={styleFinal}></div>

                                        {formData.password.length > 0 && (
                                            <img
                                                src={!showPassword ? showPass : hidePass}
                                                alt="Toggle Password Visibility"
                                                className="toggle-password-icon"
                                                onClick={handleShowPassword}
                                            />
                                        )}

                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">
                                            Password must be at least 8 characters and contain a mix of letters,
                                            numbers,
                                            and special characters.
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type={!showConfirmPassword ? "password" : "text"}
                                            className={`form-control ${formData.passwordConfirm === "" ? "" : validation.passwordConfirm ? 'is-valid' : 'is-invalid'}`}
                                            id="passwordConfirm"
                                            placeholder="Password Confirm"
                                            value={formData.passwordConfirm}
                                            onChange={handleChange}
                                            style={{paddingLeft: "3.5rem"}}
                                        />
                                        <label htmlFor="passwordConfirm" className="label-user"
                                               style={{paddingLeft: "3.5rem"}}>Password Confirm</label>
                                        <div className="position-absolute icon-container" style={styleIcon}>
                                            <IconLockCheck stroke={2} style={styleI}/>
                                        </div>
                                        <div className="position-absolute" style={styleFinal}></div>

                                        {formData.passwordConfirm.length > 0 && (
                                            <img
                                                src={!showConfirmPassword ? showPass : hidePass}
                                                alt={"Toggle Password Visibility"}
                                                className="toggle-password-icon"
                                                onClick={handleShowConfirmPassword}
                                            />
                                        )}

                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">
                                            The confirmation password you entered does not match the original.
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type="number"
                                            className={`form-control ${formData.phoneNumber === "" ? "" : validation.phoneNumber ? 'is-valid' : 'is-invalid'}`}
                                            id="phoneNumber"
                                            placeholder="Phone Number"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            style={{paddingLeft: "3.5rem"}}
                                        />
                                        <label htmlFor="phoneNumber" className="label-user"
                                               style={{paddingLeft: "3.5rem"}}>Phone
                                            Number</label>
                                        <div className="position-absolute icon-container" style={styleIcon}>
                                            <IconDeviceMobileFilled style={styleI}/>
                                        </div>
                                        <div className="position-absolute" style={styleFinal}></div>
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">
                                            The phone number must be exactly 10 digits, must start with the prefix 05.
                                        </div>
                                    </div>


                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type="email"
                                            className={`form-control ${formData.email === "" ? "" : validation.email ? 'is-valid' : 'is-invalid'}`}
                                            id="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{paddingLeft: "3.5rem"}}
                                        />
                                        <label htmlFor="email" className="label-user"
                                               style={{paddingLeft: "3.5rem"}}>Email</label>
                                        <div className="position-absolute icon-container" style={styleIcon}>
                                            <IconMailFilled stroke={2} style={styleI}/>
                                        </div>
                                        <div className="position-absolute" style={styleFinal}></div>
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">
                                            The email must end with the extension @example.com / .co.il
                                        </div>
                                    </div>


                                    <div className="form-floating mb-3 position-relative">
                                        <input
                                            type="number"
                                            className={`form-control ${formData.age === 0 ? "" : validation.age ? 'is-valid' : 'is-invalid'}`}
                                            id="age"
                                            placeholder="Age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            style={{paddingLeft: "3.5rem"}}
                                        />
                                        <label htmlFor="age" className="label-user"
                                               style={{paddingLeft: "3.5rem"}}>Age</label>
                                        <div className="position-absolute icon-container" style={styleIcon}>
                                            <IconBalloonFilled style={styleI}/>
                                        </div>
                                        <div className="position-absolute" style={styleFinal}></div>
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">
                                            The age need to be 1-120.
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="error-message">
                                            <strong>{errorMessage}</strong>
                                        </div>
                                    )}

                                    <TermsAgreement setConfirmRadio={setConfirmRadio} />

                                    <div className="d-grid">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={createAccount}
                                    >
                                        Sign Up
                                        </button>
                                    </div>


                                    <div style={{marginTop: "10px"}}>
                                        <br/>

                                        <div className={"divider-container"}>
                                            <hr className={"divider"}/>
                                            <p className={"or-text"}>or</p>
                                            <hr className={"divider"}/>
                                        </div>

                                        <div style={{color: "gray", margin: "10px", marginLeft: "40px"}}>
                                            Do you have an account? &nbsp;
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
                                                    Sign in&nbsp;
                                                    <i className="bi bi-arrow-right custom-arrow-icon"></i>
                                                </strong>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="right-section">
                                <div className="right-content">
                                    <img src={logo} alt="Logo" className="logo"/>

                                    <h2 className="welcome-title"> 🎉 Join Our Social Network Today!</h2>

                                    <p className="site-info">
                                        Create an account and start connecting, sharing, and
                                        <p>exploring amazing content with people worldwide.</p>
                                    </p>

                                    <div className="features">
                                        <div className="feature-item">
                                            <i className="fas fa-user-plus"></i> Build your personal profile and
                                            showcase your interests
                                        </div>
                                        <div className="feature-item">
                                            <i className="fas fa-users"></i> Discover and connect with like-minded
                                            people
                                        </div>
                                        <div className="feature-item">
                                            <i className="fas fa-heart"></i> Engage with exciting content and
                                            communities
                                        </div>
                                        <div className="feature-item">
                                            <i className="fas fa-bolt"></i> Get instant updates on trending topics
                                        </div>
                                    </div>

                                    <p className="cta-text">🚀 Don't wait –  <span
                                        onClick={() => navigate(NAV_CREATE_ACCOUNT)} className="signup-link">
                                        sign up now and be part of the next big thing!</span>
                                    </p>
                                </div>
                            </div>

                        </>
                    )}
        </div>
    );
}
