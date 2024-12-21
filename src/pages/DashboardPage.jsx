import React, { useEffect, useState } from "react";
import axios from "axios";
import {URL_GET_ALL_USER, URL_SERVER_SIDE} from "../Utils/Constants";
import Cookies from "universal-cookie";
import UsernameAPI from "../api/UsernameAPI";

export default function DashboardPage() {
    const [userName, setUserName] = useState("");
    const [userNames, setUserNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();
    const token = cookies.get("token").trim();

    useEffect(() => {
        const fetchUserDetails = async () => {
                try {
                    const api = new UsernameAPI();
                    await api.fetchUserDetails(setUserName);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
        };

        const fetchAllUserNames = async () => {
            try {
                const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_USER, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log("User details:", response.data);
                setUserNames(response.data);
            } catch (error) {
                console.error("Error fetching all user names:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
        fetchAllUserNames();
    }, []);

    return (
        <div>
            <h1>Welcome to the Dashboard, {userName || "Guest"}!</h1>
            <p>You are successfully logged in.</p>

            <div>
                {loading ? (
                    <p>Loading user names...</p>
                ) : (
                    <ul>
                        {userNames && userNames.length > 0 ? (
                            userNames.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
