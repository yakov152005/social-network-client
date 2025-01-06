import {useEffect, useState} from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {URL_GET_ALL_NOTIFICATION, URL_SERVER_SIDE} from "../../utils/Constants";
import "../../css/dashboard/NotificationStyle.css"
import img_null from "../../assets/navbar/User_Profile_null.png"

export default function Notification(){
    const [username,setUsername] = useState("");
    const [notifications, setNotifications] = useState([]);

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        }catch (error){
            console.log("Error to fetching user details.",error);
        }
    }

    const fetchAllNotification = async () =>{
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_NOTIFICATION + `/${username}`);
            if (response.data.success){
                setNotifications(response.data.notificationDtos);
            }
        }catch (error){
            console.error("Error to fetching notification.",error);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (username){
            fetchAllNotification();
        }
    }, [username]);

    return (
        <div className="notification-container">
            <h3 className="notification-header">התראות</h3>
            {notifications.length > 0 ? (
                <ul className="notification-list">
                    {notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                            <div className="notification-left">
                                <img
                                    src={
                                        notification.initiatorProfilePicture
                                            ? notification.initiatorProfilePicture
                                            : "https://via.placeholder.com/40"
                                    }
                                    alt="User"
                                    className="notification-profile-image"
                                />
                                <div className="notification-text">
                                    <span className="notification-initiator">{notification.initiator}</span>
                                    {notification.type === "follow" ? (
                                        <span className="notification-action">התחיל/ה לעקוב אחריך</span>
                                    ) : (
                                        <span className="notification-action">אהב/ה את הפוסט שלך</span>
                                    )}
                                </div>
                            </div>
                            {notification.type !== "follow" && (
                                <img
                                    src={notification.postImg || img_null}
                                    alt="Post"
                                    className="notification-post-image"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="notification-empty">אין התראות</p>
            )}
        </div>
    );
}