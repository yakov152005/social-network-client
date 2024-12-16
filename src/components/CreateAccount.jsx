import { useState } from "react";
import axios from "axios";
import { URL_SERVER_SIDE } from "../Utils/Constants";


export default function CreateAccount() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        age: 0,
    });
    const [errorMessage, setErrorMessage] = useState("");



    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const createAccount = async () => {
        const { username, password, phoneNumber,email, age } = formData;

        if (!username || !password || !phoneNumber || !email || age <= 0) {
            setErrorMessage("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + "/addUser", {
                username,
                password,
                phoneNumber,
                email,
                age: parseInt(age, 10),
            });
            if (response.data.success){
                alert(response.data.error);
                setErrorMessage("")
                setFormData({
                    username: "",
                    password: "",
                    phoneNumber: "",
                    email: "",
                    age: 0,
                });
            }else {
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
        <div className={"user-style-div"}>
            <h3>Create Account</h3>
            <div className={"user-style"}>
                <strong>User:</strong>
                <input
                    placeholder="enter username"
                    onChange={handleChange}
                    id="username"
                    value={formData.username}
                />
            </div>

            <div className={"user-style"}>
                <strong>Password:</strong>
                <input
                    placeholder="enter password"
                    type="password"
                    onChange={handleChange}
                    id="password"
                    value={formData.password}
                />
            </div>

            <div className={"user-style"}>
                <strong>PhoneNumber:</strong>
                <input
                    placeholder="enter phone number"
                    onChange={handleChange}
                    id="phoneNumber"
                    value={formData.phoneNumber}
                />
            </div>

            <div className={"user-style"}>
                <strong>Email:</strong>
                <input
                    placeholder="enter email"
                    onChange={handleChange}
                    id="email"
                    type={"email"}
                    value={formData.email}
                />
            </div>

            <div className={"user-style"}>
                <strong>Age:</strong>
                <input
                    placeholder="enter age"
                    type="number"
                    onChange={handleChange}
                    id="age"
                    value={formData.age}
                />
            </div>

            {errorMessage && <div style={{color: "red", padding:"10px" ,font:"bold"}} onChange={handleChange}><strong>{errorMessage}</strong></div>}

            <div className={"user-style"}>
                <button
                    className={"btn btn-primary"}
                    type="button"
                    onClick={createAccount}
                >
                    Create User
                </button>
            </div>
        </div>
    );
}
