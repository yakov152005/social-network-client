import React, { useEffect, useState } from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {
    NAV_MESSAGE,
    URL_FOLLOW,
    URL_GET_PROFILE_SEARCH,
    URL_SERVER_SIDE,
    URL_UNFOLLOW
} from "../../utils/Constants";
import ProfileSearchComponent from "../../components/dashboard/ProfileSearchComponent";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileSearch() {
    const { usernameSearch } = useParams();
    const navigate = useNavigate();

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
