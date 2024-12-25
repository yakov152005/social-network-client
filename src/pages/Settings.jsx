import React, {useState} from "react";
import "../css/SettingsStyle.css"
import axios from "axios";
import {URL_CHANGE_PASSWORD, URL_SERVER_SIDE} from "../utils/Constants";

export default function Settings() {
    const [formData, setFormData] = useState({
        username: "",
        currentPassword:"",
        newPassword: "",
        confirmPassword: "",
    });

    const [validation, setValidation] = useState({
        username: false,
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });

        const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
        const letterUpper =  /[A-Z]/.test(value);
        const letterLower = /[a-z]/.test(value);
        const numbers =/[0-9]/.test(value);

        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value.length >= 3,
                }));
                break;

            case "currentPassword": {
                setValidation((prev) => ({
                    ...prev,
                    currentPassword: value.length >= 8 && ((letterLower || letterUpper ) && hasSpecialChar && numbers),
                }));
                break;
            }

            case "newPassword":{
                setValidation((prev) => ({
                    ...prev,
                    newPassword:  value.length >= 8 && ((letterLower || letterUpper ) && hasSpecialChar && numbers),
                }));
                break;
            }

            case "confirmPassword": {
                setValidation((prev) => ({
                    ...prev,
                    confirmPassword: value === formData.newPassword,
                }));
                break;
            }

            default:
                break;
        }
    };

    const changePassword = async () =>{
        if (formData.newPassword !== formData.confirmPassword){
            alert("The new password and its confirmation do not match, try again.")
            setFormData(prevState => ({
                ...prevState, newPassword: "", confirmPassword: "",
            }))
            return;
        }
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CHANGE_PASSWORD,{
                username: formData.username,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });

            if (response.data.success){
                alert(response.data.error);
                setFormData({
                    username: "",
                    currentPassword:"",
                    newPassword: "",
                    confirmPassword: "",
                });
            }else {
                alert(response.data.error);
                setFormData({
                    username: formData.username,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            }
        }catch (error){
            console.log("Error to fetch change password");
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-floating-form">
                <div>
                    <div className="p-3 mb-2 bg-success text-white">
                        <strong>
                            Change Password
                        </strong>
                    </div>

                    <div>
                        <h3 className="settings-form-title">Change Password</h3>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className={`form-control ${formData.username === "" ? "" : validation.username ? 'is-valid' : 'is-invalid'}`}
                                id="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <label htmlFor="username">Username</label>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">Enter your username...</div>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${formData.currentPassword === "" ? "" : validation.currentPassword ? 'is-valid' : 'is-invalid'}`}
                                id="currentPassword"
                                placeholder="Current Password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="currentPassword">Current Password</label>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                                Enter your password...
                            </div>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${formData.newPassword === "" ? "" : validation.newPassword ? 'is-valid' : 'is-invalid'}`}
                                id="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="newPassword">New Password</label>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                                Password must be at least 8 characters and contain a mix of letters, numbers, and
                                special characters.
                            </div>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${formData.confirmPassword === "" ? "" : validation.confirmPassword ? 'is-valid' : 'is-invalid'}`}
                                id="confirmPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                                The password confirmation must match the new password you entered.
                            </div>
                        </div>


                        <div className="d-grid">
                            <button className="btn btn-success"
                                    type="button"
                                    disabled={!(formData.username && formData.currentPassword && formData.newPassword && formData.confirmPassword)}
                                    onClick={changePassword}>
                                Change Password
                            </button>
                        </div>

                    </div>
                </div>
            </div>
                </div>
    );
}
