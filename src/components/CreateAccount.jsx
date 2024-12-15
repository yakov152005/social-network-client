import { useState } from "react";
import axios from "axios";
import { URL_SERVER_SIDE } from "../Utils/Constants";


export default function CreateAccount() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        phoneNumber: "",
        age: 0,
    });



    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const createAccount = async () => {
        const { username, password, phoneNumber, age } = formData;

        if (!username || !password || !phoneNumber || age <= 0) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + "/addUser", {
                username,
                password,
                phoneNumber,
                age: parseInt(age, 10),
            });
            alert(response.data);
            console.log(response.data);
            setFormData({
                username: "",
                password: "",
                phoneNumber: "",
                age: 0,
            })
        } catch (error) {
            console.log("Error creating user", error);
            alert("Failed to create user.");
        }
    };

    return (
        <div className={"create-user-div"}>
            <h3>Create Account</h3>
            <div className={"create-user"}>
                <strong>User:</strong>
                <input
                    placeholder="enter username"
                    onChange={handleChange}
                    id="username"
                    value={formData.username}
                />
            </div>

            <div className={"create-user"}>
                <strong>Password:</strong>
                <input
                    placeholder="enter password"
                    type="password"
                    onChange={handleChange}
                    id="password"
                    value={formData.password}
                />
            </div>

            <div className={"create-user"}>
                <strong>PhoneNumber:</strong>
                <input
                    placeholder="enter phone number"
                    onChange={handleChange}
                    id="phoneNumber"
                    value={formData.phoneNumber}
                />
            </div>

            <div className={"create-user"}>
                <strong>Age:</strong>
                <input
                    placeholder="enter age"
                    type="number"
                    onChange={handleChange}
                    id="age"
                    value={formData.age}
                />
            </div>

            <div className={"create-user"}>
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





/*
import {useState} from "react";
import axios from "axios";
import {URL_SERVER_SIDE} from "../Utils/Constants";

export default function CreateAccount(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age,setAge] = useState(0);

    const handleChange = (event) => {
        const{id,value} = event.target;
        switch (id){
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'age':
                setAge(value);
                break;
            default:
                break;
        }
    }

    const createAccount = async () => {
        if (!username || !password || !phoneNumber || age < 0){
            alert("Please fill all fields.");
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + '/addUser',{
                username: username,
                password: password,
                phoneNumber: phoneNumber,
                age: parseInt(age,10)
            });
            alert(response.data);
            console.log(response.data);
        }catch (error){
            console.log("Error login user", error);
            alert("Failed to login user.");
        }
    }


    return(
        <div className={"create-user-div"}>
            <h3>Create Account</h3>
            <div className={"create-user"}>
                <strong>User:</strong>
                <input placeholder={"enter username"}
                       onChange={handleChange}
                       id={'username'}
                       value={username}
                />
            </div>

            <div className={"create-user"}>
                <strong>Password:</strong>
                <input placeholder={"enter password"}
                       type={"password"}
                       onChange={handleChange}
                       id={'password'}
                       value={password}
                />
            </div>

            <div className={"create-user"}>
                <strong>PhoneNumber:</strong>
                <input placeholder={"enter phone number"}
                       onChange={handleChange}
                       id={'phoneNumber'}
                       value={phoneNumber}
                />
            </div>

            <div className={"create-user"}>
                <strong>Age:</strong>
                <input placeholder={"enter age"}
                       type={"number"}
                       onChange={handleChange}
                       id={'age'}
                       value={age}
                />
            </div>

            <div className={"create-user"}>
                <button
                    className={"btn btn-primary"}
                    type={"button"}
                    onClick={createAccount}
                >Create User
                </button>
            </div>

        </div>
    )
}
 */