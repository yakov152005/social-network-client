import {useState} from "react";
import axios from "axios";
import {NAV_LOGIN, URL_RESET_PASSWORD, URL_SERVER_SIDE} from "../utils/Constants";
import {useNavigate} from "react-router-dom";


export default function ForgetPassword() {
    const [emailForReset, setEmailForReset] = useState("");
    const navigate = useNavigate();
    //const [phoneForReset, setPhoneForReset] = useState("");

    const handleChange = (event) => {
        setEmailForReset(event.target.value);
    };

    const handleClick = async () =>{
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_RESET_PASSWORD + `/${emailForReset}`);
            if (response.data.success){
                alert("Password reset successful. Check your email.");
                console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
                navigate(NAV_LOGIN);
            }
        }catch (error){
            console.error("Error get request Email",error);
        }

    };

    return (
        <div className="auth-container">
            <div className="floating-form">
                <div>
                    <h3 className="form-title">Reset Password</h3>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="emailReset"
                            placeholder="Email"
                            value={emailForReset}
                            onChange={handleChange}
                        />
                        <label htmlFor="emailReset">Email</label>
                    </div>
                    {/*{errorMessage && (
                        <div className="error-message">
                            <strong>{errorMessage}</strong>
                        </div>
                    )} */}
                    <div className="d-grid">
                        <button className="btn btn-primary" type="button" onClick={handleClick} >
                            Reset password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}