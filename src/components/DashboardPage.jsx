import React, { useEffect, useState } from "react";
import axios from "axios";
import {URL_SERVER_SIDE} from "../Utils/Constants";



export default function DashboardPage({ onLogout, userName }) {
    const [userNames, setUserNames] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchUserNames = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + "/getAllUserName");
            if (response.data) {
                setUserNames(response.data);
            }
        } catch (error) {
            console.log("Error fetching user names:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserNames();
    }, []);

    return (
        <div>
            <h1>Welcome to the Dashboard, {userName}!</h1>
            <p>You are successfully logged in.</p>


            <div>
                {loading ? (
                    <p>Loading user names...</p>
                ) : (
                    <ul>
                        {userNames.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                )}
            </div>

            <button onClick={onLogout} className="btn btn-danger">
                Logout
            </button>
        </div>
    );
}
