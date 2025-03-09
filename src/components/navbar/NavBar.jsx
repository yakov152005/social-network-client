import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/image/iconSocialNetWorkTheOriginalOne.png';
import {
    NAV_CREATE_ACCOUNT,
    NAV_LOGIN,
    NAV_DASHBOARD,
    NAV_PROFILE,
    NAV_SETTINGS,
    NAV_CREATOR,
    NAV_SEARCH,
    NAV_MESSAGE, NAV_NOTIFICATION
} from "../../utils/Constants";
import {IconSearch, IconBrandMessengerFilled, IconBell,IconMenu2, IconX } from '@tabler/icons-react';
import UsernameAPI from "../../api/UsernameAPI";
import {Badge, Avatar, Tooltip} from '@mui/material';
import { styled } from '@mui/material/styles';
import "../../App.css"


export default function NavBar({ isLoggedIn, onLogout }) {
    const [username,setUsername] = useState("");
    const [userProfilePic,setUserProfilePic] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleNavClick = () => {
        setMenuOpen(false);
    };

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername,setUserProfilePic);
        }catch (error){
            console.log("Error to fetching user details.",error);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [document.cookie]);

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
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand disabled" href={isLoggedIn ? NAV_DASHBOARD : NAV_LOGIN} aria-disabled="true">
                    <img
                        src={logo} alt="NetWork" width="35" height="30"
                        className="d-inline-block align-text-top rounded"/>
                    <strong style={{color: "white", fontFamily: 'Brush Script MT',fontSize:"25px"}}>Social-Network</strong>
                </a>

                <button className="menu-button" onClick={toggleMenu}>
                    {menuOpen ?
                        <>
                            <a className="navbar-brand disabled" href={isLoggedIn ? NAV_DASHBOARD : NAV_LOGIN}
                               aria-disabled="true"
                               style={{margin: "auto", marginRight: "15px"}}
                            >
                                <img
                                    src={logo} alt="NetWork" width="35" height="30"
                                    className="d-inline-block align-text-top rounded"/>
                                <strong style={{
                                    color: "white",
                                    fontFamily: 'Brush Script MT',
                                    fontSize: "25px"
                                }}>Social-Network</strong>
                            </a>

                            <IconX size={30}/>
                            <div className={"divider-container-nav"}>
                                <hr className={"divider-nav"}/>
                            </div>
                        </>
                        : <IconMenu2 size={30}/>}
                </button>

                <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
                    <ul className="nav nav-pills mb-3">
                        {!isLoggedIn ? (
                            <>
                                <Tooltip title="Sign Up">
                                <li className="nav-item">
                                    <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_CREATE_ACCOUNT}
                                            onClick={handleNavClick}
                                        >
                                             Register<br/>&nbsp; &nbsp; &nbsp;
                                            <i className="bi bi-person-vcard"></i>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Sign In">
                                    <li className="nav-item">
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_LOGIN}
                                            onClick={handleNavClick}
                                        >
                                            Login<br/>&nbsp; &nbsp;&nbsp;
                                            <i className="bi bi-box-arrow-right"></i>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Creator">
                                    <li className="nav-item">
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_CREATOR}
                                            onClick={handleNavClick}
                                        >
                                            Creator<br/>&nbsp; &nbsp; &nbsp;
                                            <i className="bi bi-code"></i>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                            </>
                        ) : (
                            <>
                                <Tooltip title="Home Page">
                                    <li className="nav-item" style={{marginTop: "1px"}}>
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_DASHBOARD}
                                            onClick={handleNavClick}
                                        >
                                            {/*<strong>Home</strong><br/>&nbsp; &nbsp;&nbsp; */}
                                            <i className="bi bi-house-door-fill" style={{fontSize: "32px"}}></i>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Profile">
                                    <li className="nav-item" style={{marginTop: "1px"}}>
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_PROFILE}
                                            onClick={handleNavClick}
                                        >&nbsp;
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                                variant="dot"
                                                style={{marginTop: "7px"}}
                                            >
                                                <Avatar alt={username} src={userProfilePic}/>
                                            </StyledBadge>&nbsp;
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Notification">
                                    <li className="nav-item" style={{marginTop: "12px"}}>
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_NOTIFICATION}
                                            onClick={handleNavClick}
                                        >
                                            <IconBell stroke={2} size={35}/>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Messenger">
                                    <li className="nav-item" style={{marginTop: "10px"}}>
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_MESSAGE}
                                            onClick={handleNavClick}
                                        >
                                            {/*<strong>Message</strong><br/>&nbsp; &nbsp; &nbsp; */}
                                            <IconBrandMessengerFilled stroke={2} size={35}/>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Search">
                                    <li className="nav-item" style={{marginTop: "10px"}}>
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_SEARCH}
                                            onClick={handleNavClick}
                                        >
                                            {/*<strong>Search</strong><br/>&nbsp; &nbsp; &nbsp; */}
                                            <IconSearch stroke={2} size={35}/>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Settings">
                                    <li className="nav-item" style={{marginTop: "3px"}}>
                                        <NavLink
                                            className={({isActive}) => `nav-link ${isActive ? "active-nav" : ""}`}
                                            to={NAV_SETTINGS}
                                            onClick={handleNavClick}
                                        >
                                            {/*<strong>Settings</strong><br/>&nbsp; &nbsp; &nbsp;*/}
                                            <i className="bi bi-gear-fill" style={{fontSize: "30px"}}></i>
                                        </NavLink>
                                    </li>
                                </Tooltip>
                                <Tooltip title="Logout">
                                    <li className="nav-item" style={{marginTop: "3px"}} onClick={handleNavClick}>
                                        <button className="btn btn-danger nav-link" onClick={onLogout} >
                                            {/*<strong style={{color: "red"}}>Logout</strong><br/>&nbsp; &nbsp;&nbsp; */}
                                            <i className="bi bi-box-arrow-right"
                                               style={{fontSize: "30px", color: "red"}}></i>
                                        </button>
                                    </li>
                                </Tooltip>
                            </>
                        )}
                    </ul>
                </ul>
            </div>
        </nav>
);
}