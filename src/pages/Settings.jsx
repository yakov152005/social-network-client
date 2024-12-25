import {useState} from "react";
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

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
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
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                placeholder="Current Password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="currentPassword">Current Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="newPassword">New Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                        </div>


                        <div className="d-grid">
                            <button className="btn btn-success" type="button" onClick={changePassword}>
                                Change Password
                            </button>
                        </div>

                    </div>
                </div>
            </div>
                </div>
    );
}
