import React, { useEffect, useState } from "react";
import "../../css/loaders/LoadingScreenStyle.css";
import logo from "../../assets/image/iconSocialNetWorkTheOriginalOne.png"


const LoadingScreen = ({ onLoaded }) => {
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setShowLogo(false);
            onLoaded();
        }, 1500);
    }, [onLoaded]);

    return (
        <div className="loading-overlay-screen">
            {showLogo ? (
                <div className="logo-container-screen">
                    <img src={logo} alt="Social Network Logo" className="logo-img-screen" />
                    <p className="from-text-screen">From Social Network</p>
                </div>
            ) : (
                <div className="insta-loader-screen">
                    <div className="insta-spinner-screen"></div>
                    <p className="loading-text-insta-screen">Loading posts...</p>
                </div>
            )}
        </div>
    );
};

export default LoadingScreen;
