import React, {useCallback, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarDesktop from "../navbar/SidebarDesktop";
import MobileNavBar from "../navbar/MobileNavBar";
import SearchPanel from "../dashboard/SearchPanel";
import UsernameAPI from "../../api/UsernameAPI";
import FollowsNumberAPI from "../../api/FollowsNumberAPI";
import {
    NAV_PROFILE_SEARCH_BASE,
    URL_SERVER_SIDE,
    URL_GET_ALL_USER_NAMES_AND_PIC, URL_GET_ALL_NOTIFICATION, TIME_NOTI, URL_CONNECTION_NOTIFICATION
} from "../../utils/Constants";
import NotificationPanel from "../dashboard/NotificationPanel";
import HomeSpeedDial from "./HomeSpeedDial";

export default function NavBar({ isLoggedIn, onLogout }) {
    const [username, setUsername] = useState("");
    const [userProfilePic, setUserProfilePic] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [value, setValue] = useState("");
    const [userNamesAndPic, setUserNamesAndPic] = useState([]);
    const [filterByUsernames, setFilterByUsernames] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loadingNotification, setLoadingNotification] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navigate = useNavigate();
    const eventSourceRef = useRef(null);


    const handleUserClick = (usernameSearch) => {
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleUserClickNotification = (usernameInitiator) => {
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameInitiator}`);
    };

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername, setUserProfilePic);
        } catch (error) {
            console.log("Error fetching user details", error);
        }
    };

    const fetchUserNames = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_USER_NAMES_AND_PIC);
            if (response.data.success) {
                setUserNamesAndPic(response.data.usernameWithPicDTOS);
            } else {
                console.log(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching usernames", error);
        }
    };

    const getProfileByValue = useCallback(() => {
        if (value.trim() === "") {
            setFilterByUsernames([]);
            return;
        }
        const filtered = userNamesAndPic.filter(
            (person) =>
                person.username.toLowerCase().startsWith(value.toLowerCase()) &&
                person.username.toLowerCase() !== username.toLowerCase()
        );
        setFilterByUsernames(filtered);
    }, [userNamesAndPic, value, username]);

    const fetchFollowingAndFollowers = async () => {
        try {
            const api = new FollowsNumberAPI();
            await api.fetchFollowingAndFollowersNumbers(username, setFollowers, setFollowing);
        } catch (error) {
            console.log("Error fetching followers/following", error);
        }
    };

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

    useEffect(() => {
        fetchDetails();
    }, [document.cookie]);

    useEffect(() => {
        fetchUserNames();
    }, []);

    useEffect(() => {
        getProfileByValue();
    }, [getProfileByValue]);

    useEffect(() => {
        if (username) {
            fetchFollowingAndFollowers();
        }
    }, [username,followers,following]);

    useEffect(() => {
        if (username) {
            fetchAllNotification();
        }
    }, [username]);

    useEffect(() => {
        if (isLoggedIn && username) {

            eventSourceRef.current = new EventSource(URL_SERVER_SIDE + URL_CONNECTION_NOTIFICATION + `/${username}`);

            eventSourceRef.current.addEventListener("notification", (event) => {
                const data = JSON.parse(event.data);
                console.log("New Notification:", data);

                setNotifications(prev => [data, ...prev]);
            });

            eventSourceRef.current.onerror = () => {
                console.error("SSE connection error");
                eventSourceRef.current.close();
            };

            return () => {
                eventSourceRef.current.close();
            };
        }
    }, [isLoggedIn, username]);

    const sidebarWidth = window.innerWidth >= 1724 ? 220 : 80;


    return (
        <>
                <style>{`
                /* סגנונות לנאב בר */
                .sidebar {
                    width: 220px;
                    position: fixed;
                    left: 0;
                    top: 0;
                    height: 100vh;
                    background-color: white;
                    border-right: 1px solid #e5e7eb;
                    z-index: 50;
                    display: flex;
                    flex-direction: column;
                    transition: width 0.3s;
                }

                .mobile-top-bar {
                    display: none;
                }

                .sidebar-logo {
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #f3f4f6;
                    margin-bottom: 8px;
                }

                .sidebar-logo h1 {
                    font-weight: bold;
                    background: linear-gradient(to right, #1a77f2, #3b82f6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0;
                    font-size: 18px;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    color: #4b5563;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .nav-link:hover {
                    background-color: #f3f4f6;
                }

                .nav-link.active {
                    color: #1a77f2;
                    font-weight: 600;
                }

                .nav-link svg {
                    width: 22px;
                    height: 22px;
                }

                .profile-section {
                    margin-top: auto;
                    position: relative;
                    padding: 8px;
                    border-top: 1px solid #f3f4f6;
                }

                .profile-button {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    width: 100%;
                    text-align: left;
                    gap: 12px;
                    border-radius: 9999px;
                    transition: background-color 0.2s;
                }
    
                .profile-button:hover {
                    background-color: #f3f4f6;
                }
    
                .profile-info {
                    display: flex;
                    flex-direction: column;
                }

                .profile-name {
                    font-weight: 600;
                    font-size: 14px;
                    margin: 0;
                }
                
                .profile-username {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 0;
                }

                .profile-popup {
                    position: absolute;
                    bottom: 70px;
                    left: 16px;
                    width: 260px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    border: 1px solid #e5e7eb;
                    padding: 16px;
                    display: none;
                    z-index: 60;
                }
                
                .profile-section:hover .profile-popup {
                    display: block;
                }

                .popup-header {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 12px;
                }

                .popup-stats {
                    display: flex;
                    gap: 24px;
                    margin-bottom: 16px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid #e5e7eb;
                }

                .stat-item {
                    display: flex;
                    gap: 4px;
                    align-items: baseline;
                }

                .stat-value {
                    font-weight: 600;
                    font-size: 14px;
                }

                .stat-label {
                    color: #6b7280;
                    font-size: 13px;
                }

                .popup-actions > * {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 0;
                    color: #374151;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                }

                .popup-actions > *:hover {
                    color: #1d4ed8;
                }

                .popup-actions .logout {
                    color: #ef4444;
                }

                .popup-actions .logout:hover {
                    color: #dc2626;
                }

                /* סגנונות למסכים בינוניים - הצגת אייקונים בלבד */
                @media (min-width: 800px) and (max-width: 1723px) {
                    .sidebar {
                        width: 80px;
                    }
                    .sidebar-text {
                        display: none;
                    }
                    .profile-section {
                        display: flex;
                        justify-content: center;
                    }
                    .profile-button {
                        justify-content: center;
                        padding: 10px;
                    }
                    .profile-popup {
                        left: 80px;
                        bottom: 10px;
                    }
                    .nav-link {
                        padding: 14px;
                        justify-content: center;
                    }
                    .nav-link svg {
                        width: 24px;
                        height: 24px;
                    }
                }

                /* סגנונות למסכים קטנים - תפריט תחתון */
                @media (max-width: 799px) {
                    .sidebar {
                        display: none;
                    }
                    
                    .mobile-top-bar {
                        display: flex;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: white;
                        border-bottom: 1px solid #e5e7eb;
                        padding: 12px 16px;
                        justify-content: space-between;
                        align-items: center;
                        z-index: 50;
                    }
                    
                    .mobile-top-bar .logo-section {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    
                    .mobile-top-bar .logo-text {
                        font-weight: bold;
                        background: linear-gradient(to right, #1a77f2, #3b82f6);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-size: 18px;
                        margin: 0;
                    }
                    
                    .mobile-top-bar .action-buttons {
                        display: flex;
                        gap: 16px;
                    }
                    
                    .mobile-top-bar .action-button {
                        background: none;
                        border: none;
                        color: #4b5563;
                        cursor: pointer;
                        position: relative;
                    }
                    
                    .mobile-top-bar .notification-count {
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        background: #ef4444;
                        color: white;
                        font-size: 10px;
                        width: 16px;
                        height: 16px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .content-wrapper {
                        padding-top: 60px;
                        padding-bottom: 70px;
                    }
                    
                    .mobile-navbar {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-color: white;
                        border-top: 1px solid #e5e7eb;
                        z-index: 50;
                        display: flex;
                        justify-content: space-around;
                        padding: 10px 0;
                    }
                    
                    .mobile-nav-link {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #4b5563;
                        text-decoration: none;
                        font-size: 11px;
                        font-weight: 500;
                    }
                    
                    .mobile-nav-link.active {
                        color: #1a77f2;
                        font-weight: 600;
                    }
                    
                    .mobile-nav-link svg {
                        width: 24px;
                        height: 24px;
                        margin-bottom: 4px;
                    }
                    
                    .mobile-profile {
                        position: relative;
                    }
                    
                    .mobile-profile-popup {
                        position: absolute;
                        right: 0;
                        bottom: 45px;
                        width: 260px;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        border: 1px solid #e5e7eb;
                        padding: 16px;
                        display: none;
                        z-index: 60;
                    }
                    
                    .mobile-profile:hover .mobile-profile-popup {
                        display: block;
                    }
                }
            `}</style>

            {!isLoggedIn && (
                <HomeSpeedDial/>
            )}

            {isLoggedIn && (
                <>
                    <MobileNavBar
                        username={username}
                        userProfilePic={userProfilePic}
                        followers={followers}
                        following={following}
                        onLogout={onLogout}
                        navigate={navigate}
                        setIsSearchOpen={setIsSearchOpen}
                        isSearchOpen={isSearchOpen}
                        setIsNotificationOpen={setIsNotificationOpen}
                        isNotificationOpen={isNotificationOpen}
                    />

                    <SidebarDesktop
                        username={username}
                        userProfilePic={userProfilePic}
                        followers={followers}
                        following={following}
                        hovered={hovered}
                        setHovered={setHovered}
                        onLogout={onLogout}
                        navigate={navigate}
                        isSearchOpen={isSearchOpen}
                        setIsSearchOpen={setIsSearchOpen}
                        setIsNotificationOpen={setIsNotificationOpen}
                        isNotificationOpen={isNotificationOpen}
                    />

                    <SearchPanel
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                        value={value}
                        onChange={handleChange}
                        results={filterByUsernames}
                        onUserClick={handleUserClick}
                        sidebarWidth={sidebarWidth}
                        setValue={setValue}
                    />

                    <NotificationPanel
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                        notifications={notifications}
                        sidebarWidth={sidebarWidth}
                        onUserClick={handleUserClickNotification}
                        loading={loadingNotification}
                    />

                </>
            )}
        </>
    );
}
