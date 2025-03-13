import React, {useEffect, useState} from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {NAV_PROFILE_SEARCH_BASE, TIME_NOTI, URL_GET_ALL_NOTIFICATION, URL_SERVER_SIDE} from "../../utils/Constants";
import "../../css/dashboard/NotificationStyle.css"
import img_null from "../../assets/navbar/User_Profile_null.png"
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {FiWifi} from "react-icons/fi";

export default function Notification(){
    const [username,setUsername] = useState("");
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    const [loadingNotification, setLoadingNotification] = useState(false);

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        }catch (error){
            console.log("Error to fetching user details.",error);
        }
    }

    const fetchAllNotification = async () =>{
        setLoadingNotification(true);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_NOTIFICATION + `/${username}`);
            if (response.data.success){
                setNotifications(response.data.notificationDtos);
            }
        }catch (error){
            console.error("Error to fetching notification.",error);
        }finally {
            setTimeout(() => {
                setLoadingNotification(false);
            },TIME_NOTI);
        }
    }

    const handleUserClick = (usernameInitiator) => {
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameInitiator}`);
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (username){
            fetchAllNotification();
        }
    }, [username]);


    if (loadingNotification) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">

                <motion.h2
                    className="text-2xl font-bold text-blue-600 mb-5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Notification...
                </motion.h2>


                <motion.div
                    className="w-16 h-16 border-4 border-solid border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{
                        boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.5)"
                    }}
                />


                <motion.div
                    className="mt-5 text-sm text-blue-600 mb-5"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    Please wait, We are loading your notification... <FiWifi/>
                </motion.div>
            </div>
        );
    }

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
                                            : img_null
                                    }
                                    onClick={() => handleUserClick(notification.initiator)}
                                    alt="User"
                                    className="notification-profile-image"
                                />
                                <div className="notification-text">
                                    <span className="notification-initiator"
                                          onClick={() => handleUserClick(notification.initiator)}
                                    >{notification.initiator}</span>
                                    {notification.type === "follow" && (
                                        <span className="notification-action">התחיל/ה לעקוב אחריך</span>
                                    )}
                                    {notification.type === "like" && (
                                        <span className="notification-action">אהב/ה את הפוסט שלך</span>
                                    )}
                                    {notification.type === "comment" && (
                                        <span className="notification-action"><strong>{notification.content} </strong> הגיב/ה לפוסט שלך </span>
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