import React, { useEffect, useState } from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {
    NAV_MESSAGE, TIME_PROFILE,
    URL_FOLLOW,
    URL_GET_PROFILE_SEARCH,
    URL_SERVER_SIDE,
    URL_UNFOLLOW
} from "../../utils/Constants";
import ProfileSearchComponent from "../../components/dashboard/ProfileSearchComponent";
import { useNavigate, useParams } from "react-router-dom";
import {motion} from "framer-motion";

export default function ProfileSearch() {
    const { usernameSearch } = useParams();
    const navigate = useNavigate();

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingFollow, setLoadingFollow] = useState(false);
    const [currentUsername, setCurrentUsername] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: "",
        profilePicture: "",
        followers: 0,
        following: 0,
        isFollowing: false,
        posts: [],
    });

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setCurrentUsername);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };

    const fetchProfileSearch = async () => {
        setLoadingProfile(true);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_PROFILE_SEARCH + `/${currentUsername}&${usernameSearch}`);
            if (response.data.success) {
                const profileDto = response.data.profileDto;
                setProfileData({
                    username: profileDto.username,
                    profilePicture: profileDto.profilePicture,
                    followers: profileDto.followers,
                    following: profileDto.following,
                    isFollowing: profileDto.isFollowing,
                    posts: profileDto.posts,
                });
                setIsFollowing(profileDto.isFollowing);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error to fetch profile search.", error);
        }finally {
            setTimeout(() => {
                setLoadingProfile(false);
            },TIME_PROFILE)
        }
    };



    const handleFollowToggle = async () => {
        setLoadingFollow(true);
        try {
            if (isFollowing) {
                const response = await axios.delete(URL_SERVER_SIDE + URL_UNFOLLOW + `/${usernameSearch}&${currentUsername}`);
                if (response.data.success) {
                    setIsFollowing(false);
                }
            } else {
                const response = await axios.post(URL_SERVER_SIDE + URL_FOLLOW + `/${usernameSearch}&${currentUsername}`);
                if (response.data.success) {
                    setIsFollowing(true);
                }
            }

            await fetchProfileSearch();
        } catch (error) {
            console.error("Error toggling follow state", error);
        }
        setTimeout(() =>
            setLoadingFollow(false),1500
        )
    };

    const handleSendMessage = () => {
        navigate(NAV_MESSAGE + `?receiver=${profileData.username}`);
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (usernameSearch && currentUsername) {
            fetchProfileSearch();
        }
    }, [usernameSearch, currentUsername]);

    if (loadingProfile) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">

                <motion.h2
                    className="text-2xl font-bold text-blue-600 mb-5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Profile...
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
                    Please wait, We are loading the profile you are looking for...
                </motion.div>
            </div>
        );
    }

    return (
        <ProfileSearchComponent
            username={usernameSearch}
            profileData={profileData}
            isFollowing={isFollowing}
            onFollowToggle={handleFollowToggle}
            onSendMessage={handleSendMessage}
            loadingFollow={loadingFollow}
        />
    );
}
