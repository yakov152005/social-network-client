import React from "react";
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    ChatBubbleBottomCenterTextIcon,
    HeartIcon,
    UserIcon,
    BellIcon,
    ArrowRightOnRectangleIcon, Cog6ToothIcon
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeSolidIcon,
    ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextSolidIcon,
    HeartIcon as HeartSolidIcon,
    UserIcon as UserSolidIcon,
    MagnifyingGlassIcon as MagnifyingGlassSolidIcon
} from '@heroicons/react/24/solid';
import { SearchCheckIcon } from "lucide-react";
import logo from '../../assets/image/iconSocialNetWorkTheOriginalOne.png';
import {NAV_DASHBOARD, NAV_MESSAGE, NAV_PROFILE, NAV_SETTINGS} from "../../utils/Constants";
import {Avatar} from "../ui/Avatar";
import {styled} from "@mui/material/styles";
import {Badge} from "@mui/material";
import img_null from "../../assets/navbar/User_Profile_null.png"

export default function MobileNavBar({
                                         username,
                                         userProfilePic,
                                         followers,
                                         following,
                                         onLogout,
                                         navigate,
                                         setIsSearchOpen,
                                         isSearchOpen,
                                         setIsNotificationOpen,
                                         isNotificationOpen
                                     }) {

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <>

            <div className="mobile-top-bar">
                <a className="logo-section" style={{textDecoration: "none"}}
                   href={NAV_DASHBOARD}>
                    <img src={logo || ""} alt="NetWork" width="28" height="28"/>
                    <h2 className="logo-text">Social Network</h2>
                </a>
                <div className="action-buttons">
                    <button className="action-button" onClick={() => navigate(NAV_MESSAGE)}>
                        <ChatBubbleBottomCenterTextIcon className="w-6 h-6"/>
                        <span className="notification-count">{""}</span>
                    </button>
                    <button className="action-button" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <BellIcon className="w-6 h-6"/>
                        <span className="notification-count">{""}</span>
                    </button>
                </div>
            </div>


            <div className="mobile-navbar md:hidden">
                <NavLink to={NAV_DASHBOARD}
                         className={({isActive}) => `mobile-nav-link ${isActive ? "active" : ""}`}>
                    {({isActive}) => (
                        <>
                            {isActive ?
                                <HomeSolidIcon className="w-6 h-6"/> :
                                <HomeIcon className="w-6 h-6"/>
                            }
                            <span>Home</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSearchOpen(!isSearchOpen);
                    }}
                    className={`mobile-nav-link ${isSearchOpen ? "active" : ""}`}
                >
                    {isSearchOpen ?
                        <SearchCheckIcon className="w-6 h-6"/> :
                        <MagnifyingGlassSolidIcon className="w-6 h-6 text-gray-600"/>
                    }
                    <span className="text-gray-600">Search</span>
                </NavLink>


                <NavLink to={NAV_MESSAGE}
                         className={({isActive}) => `mobile-nav-link ${isActive ? "active" : ""}`}>
                    {({isActive}) => (
                        <>
                            {isActive ?
                                <ChatBubbleBottomCenterTextSolidIcon className="w-6 h-6"/> :
                                <ChatBubbleBottomCenterTextIcon className="w-6 h-6"/>
                            }
                            <span>Messages</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsNotificationOpen(!isNotificationOpen);
                    }}
                    className={`mobile-nav-link ${isNotificationOpen ? "active" : ""}`}
                >
                    {isNotificationOpen ?
                        <HeartSolidIcon className="w-6 h-6"/> :
                        <HeartIcon className="w-6 h-6" color={"#4B5563"}/>
                    }
                    <span className="text-gray-600">Notifications</span>
                </NavLink>

                <div className="mobile-profile">
                    <NavLink to={NAV_PROFILE}
                             className={({isActive}) => `mobile-nav-link ${isActive ? "active" : ""}`}>
                        {({isActive}) => (
                            <>
                                {isActive ?
                                    <UserSolidIcon className="w-6 h-6"/> :
                                    <UserIcon className="w-6 h-6"/>
                                }
                                <span>Profile</span>
                            </>
                        )}
                    </NavLink>

                    <div className="mobile-profile-popup">
                        <div className="popup-header">
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                variant="dot"
                            >
                                <Avatar
                                    alt={username}
                                    src={userProfilePic || img_null}
                                    sx={{width: 40, height: 40}}
                                />
                            </StyledBadge>
                            <div>
                                <p className="profile-name">{username}</p>
                                <p className="profile-username">@{username?.toLowerCase().replace(/\s/g, '')}</p>
                            </div>
                        </div>

                        <div className="popup-stats">
                            <div className="stat-item">
                                <span className="stat-value">{following}</span>
                                <span className="stat-label">Following</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{followers}</span>
                                <span className="stat-label">Followers</span>
                            </div>
                        </div>

                        <div className="popup-actions">
                            <div onClick={() => navigate(NAV_PROFILE)}>
                                <UserIcon className="w-5 h-5"/>
                                <span>Profile</span>
                            </div>
                            <div onClick={() => navigate(NAV_SETTINGS)}>
                                <Cog6ToothIcon className="w-5 h-5"/>
                                <span>Settings</span>
                            </div>
                            <div className="logout" onClick={onLogout}>
                                <ArrowRightOnRectangleIcon className="w-5 h-5"/>
                                <span>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
