import React, {useState} from "react";
import axios from "axios";
import {NAV_LOGIN, URL_CREATE_USER, URL_SERVER_SIDE} from "../utils/Constants";
import "../css/LoginAndCreate.css";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";


export default function CreateAccount() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isCreate, setIsCreate] = useState(false);
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


    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });


        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value.length >= 3,
                }));
                break;

            case "password": {
                const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
                const letterUpper =  /[A-Z]/.test(value);
                const letterLower = /[a-z]/.test(value);
                const numbers =/[0-9]/.test(value);

                setValidation((prev) => ({
                    ...prev,
                    password: value.length >= 8 && ((letterLower || letterUpper ) && hasSpecialChar && numbers),
                }));
                break;
            }

            case "passwordConfirm":{
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
        const {username, password,passwordConfirm, phoneNumber, email, age} = formData;

        if (!username || !password || !passwordConfirm || !phoneNumber || !email || age <= 0) {
            setErrorMessage("Please fill all fields.");
            return;
        }

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
                setErrorMessage("Success to add user.")
                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }`);
                setIsCreate(true);
                setFormData({
                    username: "",
                    password: "",
                    passwordConfirm: "",
                    phoneNumber: "",
                    email: "",
                    age: 0,
                });
            } else {
                const errorCode = response.data.errorCode;
                const fieldToClear = switchError(errorCode);
                setErrorMessage(response.data.error);
                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} } , errorCode: { ${errorCode}`);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldToClear]: "",
                }));
            }
        } catch (error) {
            console.log("Error creating user", error);
            setErrorMessage("Failed to create user. Please try again later.");
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

    return (
        <div className="auth-container">
            <div className="floating-form">

                {!isCreate ? (
                    <div>
                        <h3 className="form-title">Create Account</h3>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}/>
                            <label htmlFor="username">Username</label>
                            {validation.username && <span className="validation-success">looking good✅</span>}
                        </div>


                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}/>
                            <label htmlFor="password">Password</label>
                            {validation.password && <span className="validation-success">looking good✅</span>}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="passwordConfirm"
                                placeholder="Password Confirm"
                                value={formData.passwordConfirm}
                                onChange={handleChange}/>
                            <label htmlFor="passwordConfirm">Password Confirm</label>
                            {validation.passwordConfirm && <span className="validation-success">looking good✅</span>}
                        </div>


                        <div className="form-floating mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}/>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            {validation.phoneNumber && (<span className="validation-success">looking good✅</span>)}
                        </div>


                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}/>
                            <label htmlFor="email">Email</label>
                            {validation.email && <span className="validation-success">looking good✅</span>}
                        </div>


                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}/>
                            <label htmlFor="age">Age</label>
                            {validation.age && <span className="validation-success">looking good✅</span>}
                        </div>

                        {errorMessage && (
                            <div className="error-message">
                                <strong>{errorMessage}</strong>
                            </div>
                        )}

                        <div className="d-grid">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={createAccount}>
                                Create Account
                            </button>
                        </div>

                        <br></br>

                        <div  style={{color: "blue"}}>
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Already have an account? &nbsp;
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="custom-arrow-icon"
                                        viewBox="0 0 16 16"
                                        style={{transition: "transform 0.3s ease"}}
                                    >
                                        <path fillRule="evenodd"
                                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                    </svg>
                                </strong>
                            </a>
                        </div>


                    </div>
                ) : (
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="/login"/>}/>
                        </Routes>
                    </div>
                )}
            </div>
        </div>
    );
}
