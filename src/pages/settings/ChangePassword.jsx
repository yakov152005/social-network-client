import React, {useEffect, useState} from "react";
import "../../css/settings/SettingsStyle.css"
import axios from "axios";
import {NAV_SETTINGS, URL_CHANGE_PASSWORD, URL_SERVER_SIDE} from "../../utils/Constants";
import {useNavigate} from "react-router-dom";
import UsernameAPI from "../../api/UsernameAPI";
import {IconCloudLock } from "@tabler/icons-react";
import Swal from "sweetalert2";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        currentPassword: "",
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
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});

        const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
        const letterUpper = /[A-Z]/.test(value);
        const letterLower = /[a-z]/.test(value);
        const numbers = /[0-9]/.test(value);

        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value === username
                }));
                break;

            case "currentPassword": {
                setValidation((prev) => ({
                    ...prev,
                    currentPassword: value.length >= 8 && ((letterLower || letterUpper) && hasSpecialChar && numbers),
                }));
                break;
            }

            case "newPassword": {
                setValidation((prev) => ({
                    ...prev,
                    newPassword: value.length >= 8 && ((letterLower || letterUpper) && hasSpecialChar && numbers),
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

    const changePassword = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            alert("The new password and its confirmation do not match, try again.")
            setFormData(prevState => ({
                ...prevState, newPassword: "", confirmPassword: "",
            }))
            return;
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Before you change your password, make sure you have saved it in a secure place and that you remember it.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed){
            try {
                const response = await axios.post(URL_SERVER_SIDE + URL_CHANGE_PASSWORD, {
                    username: formData.username,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                });

                if (response.data.success) {
                    Swal.fire("Changed!",response.data.error,"success");
                    setFormData({
                        username: "",
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                    navigate(NAV_SETTINGS);
                } else {
                    Swal.fire("Error",response.data.error,"error");
                    setFormData({
                        username: formData.username,
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                }
            } catch (error) {
                console.log("Error to fetch change password");
                Swal.fire("Error", "Failed to delete user.", "error");
            }
        }
    };

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div className="settings-container">
            <div className="left-section-settings">
                <div className="settings-floating-form">
                    <div>
                        <div className="p-3 mb-2 bg-success text-white">
                            <strong>
                                Change Password
                            </strong>
                        </div>
                        {/*   <h3 className="settings-form-title">Change Password</h3> */}
                        <div>

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
                                <div className="valid-feedback">approved!</div>
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
                                        disabled={!(formData.username && formData.currentPassword && formData.confirmPassword && (formData.username === username))}
                                        onClick={changePassword}>
                                    Change Password
                                </button>
                            </div>

                            <br/>
                            <div className={"divider-container"}>
                                <hr className={"divider"}/>
                                <p className={"or-text"}>or</p>
                                <hr className={"divider"}/>
                            </div>

                            <br/>
                            <div style={{color: "gray", margin: "5px", marginLeft: "116px"}}>
                                <a onClick={() => navigate(NAV_SETTINGS)}
                                   className="custom-link"
                                   style={{
                                       cursor: "pointer",
                                       textDecoration: "underline",
                                       color: "gray",
                                       display: "inline-flex",
                                       alignItems: "center",
                                   }}>
                                    <strong>
                                        Back to settings&nbsp;
                                        <i className="bi bi-arrow-right custom-arrow-icon"></i>
                                    </strong>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="right-section-settings">
                <IconCloudLock stroke={0.5} size={320} color={"black"} />
                <h2 style={{color: "black"}}><strong>Change password</strong></h2>
                <p style={{color: "gray"}}>
                    keep the password in a safe place and not write it down in places that could be exposed
                </p>
            </div>

        </div>
    );
}
