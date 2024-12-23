import React, {useState} from "react";
import axios from "axios";
import { NAV_LOGIN, URL_CREATE_USER, URL_SERVER_SIDE} from "../utils/Constants";
import "../css/LoginAndCreate.css";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";


export default function CreateAccount() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isCreate, setIsCreate] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        age: 0,
    });



    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});
    };

    const createAccount = async () => {
        const {username, password, phoneNumber, email, age} = formData;

        if (!username || !password || !phoneNumber || !email || age <= 0) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CREATE_USER, {
                username,
                password,
                phoneNumber,
                email,
                age: parseInt(age, 10),
            });
            if (response.data.success) {
                setIsCreate(true);
              //  alert(response.data.error);
                setErrorMessage("")
                setFormData({
                    username: "",
                    password: "",
                    phoneNumber: "",
                    email: "",
                    age: 0,
                });
            } else {
                const errorCode = response.data.errorCode;
                const fieldToClear = switchError(errorCode);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldToClear]: "",
                }));
                setErrorMessage(response.data.error);

            }

            console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
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
                return "phoneNumber";
            case 5:
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

                        <div style={{color: "blue"}}>
                             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Already have an account? &nbsp;
                            <a className="icon-link"
                               onClick={() => navigate(NAV_LOGIN)}
                               style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}>
                                <strong> Sign in →</strong>
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
