import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {NAV_CREATE_ACCOUNT, NAV_LOGIN, NAV_SETTINGS, PATH, URL_DELETE_USER, URL_SERVER_SIDE} from "../utils/Constants";
import UsernameAPI from "../api/UsernameAPI";
import "../css/SettingsStyle.css"
import axios from "axios";
import { IconAlertTriangle } from '@tabler/icons-react';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";


export default function DeleteUser(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [validation, setValidation] = useState({
        username: false,
        password: false,
        confirmPassword: false,
    });



    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});

        switch (id) {
            case "username":
                setValidation((prev) => ({
                    ...prev,
                    username: value === username,
                }));
                break;

            case "password": {
                setValidation((prev) => ({
                    ...prev,
                    password: value.length >= 8 ,
                }));
                break;
            }

            case "confirmPassword": {
                setValidation((prev) => ({
                    ...prev,
                    confirmPassword: value === formData.password,
                }));
                break;
            }

            default:
                break;
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



    const deleteUser = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Deleting your account will remove all your data permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response =
                    await axios.delete(
                        URL_SERVER_SIDE + URL_DELETE_USER + `/${formData.username}&${formData.password}`
                    );
                if (response.data.success) {
                    Swal.fire("Deleted!", response.data.error, "success");
                    cookies.remove("token", { path: PATH });
                    navigate(NAV_CREATE_ACCOUNT);
                } else {
                    Swal.fire("Error", "Failed to delete user.", "error");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire("Error", "Failed to delete user.", "error");
            }
        }
    };

    return (
        <div className="settings-container">
            <div className="left-section-settings">
                <div className="settings-floating-form">
                    <div>
                        <div className="p-3 mb-2 bg-danger text-white">
                            <strong>
                                Delete User
                            </strong>
                        </div>
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
                                    className={`form-control ${formData.password === "" ? "" : validation.password ? 'is-valid' : 'is-invalid'}`}
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password">Password</label>
                                <div className="valid-feedback">Its ok!</div>
                                <div className="invalid-feedback">
                                    Enter your password...
                                </div>
                            </div>


                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${formData.confirmPassword === "" ? "" : validation.confirmPassword ? 'is-valid' : 'is-invalid'}`}
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="valid-feedback">Its ok!</div>
                                <div className="invalid-feedback">
                                    The password confirmation must match the current password you entered.
                                </div>
                            </div>


                            <div className="d-grid">
                                <button className="btn btn-danger"
                                        type="button"
                                        disabled={!(formData.username && formData.password && formData.confirmPassword && (formData.username === username))}
                                        onClick={deleteUser}>
                                    Delete User
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
                <IconAlertTriangle stroke={1} size={300} color={"red"} />
                <h2 style={{color:"red"}}><strong>Warning!</strong></h2>
                <p style={{color:"gray"}}>
                    Deleting a user will result in all information related to it being deleted without any way to recover it
                </p>
            </div>

        </div>
    );
}