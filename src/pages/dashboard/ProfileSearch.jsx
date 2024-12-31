import React, {useEffect, useState} from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {
    NAV_MESSAGE,
    URL_FOLLOW,
    URL_GET_PROFILE_SEARCH,
    URL_SERVER_SIDE,
    URL_UNFOLLOW
} from "../../utils/Constants";
import Post from "../../components/Post";
import "../../css/dashboard/ProfileStyle.css"
import {useNavigate, useParams} from "react-router-dom";

export default function ProfileSearch() {
    const { usernameSearch} = useParams();
    const navigate = useNavigate();

    const [currentUsername, setCurrentUsername] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: "",
        profilePicture: "",
        followers: 0,
        following: 0,
        isFollowing: false,
        posts: []
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
                console.log(response.data.error)
            } else {
                console.log(response.data.error)
            }
        } catch (error) {
            console.error("Error to fetch profile search.", error);
        }
    }

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                const response = await axios.delete(URL_SERVER_SIDE + URL_UNFOLLOW + `/${usernameSearch}&${currentUsername}`);
                if (response.data.success) {
                    console.log(response.data.error);
                    setIsFollowing(false);
                }else {
                    console.log(response.data.error);
                }
            } else {
                const response = await axios.post(URL_SERVER_SIDE + URL_FOLLOW + `/${usernameSearch}&${currentUsername}`);
                if (response.data.success){
                    setIsFollowing(true);
                    console.log(response.data.error);
                }else {
                    console.log(response.data.error)
                }
            }

            await fetchProfileSearch();

        } catch (error) {
            console.error("Error toggling follow state", error);
        }
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
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-picture">
                    <img
                        src={profileData.profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                    />
                </div>

                <div className="profile-info">
                    <h1>
                        <strong>{profileData.username ? profileData.username.toLocaleUpperCase() : "Loading..."}</strong>
                        &nbsp; &nbsp;
                        <button onClick={handleFollowToggle} className={"btn btn-primary"} style={{fontSize: "12px"}}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                        &nbsp; &nbsp;
                        <button onClick={handleSendMessage} className={"btn btn-primary"} style={{fontSize: "12px"}}>
                            Message
                        </button>
                    </h1>

                    <br/>
                    <p>posts <strong>{profileData.posts.length}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        followers <strong>{profileData.followers}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        following <strong>{profileData.following}</strong>
                    </p>

                </div>
            </div>

            <div>
                {
                    profileData.posts.length > 0 ? (
                        <Post posts={profileData.posts}/>
                    ) : (
                        <p>No posts available.</p>
                    )
                }
            </div>


        </div>
    )
}