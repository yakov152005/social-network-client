import React, {useState} from "react";
import "../../css/dashboard/ProfileStyle.css";
import img_null from "../../assets/navbar/User_Profile_null.png";
import Post from "./Post";
import FollowListComponent from "./FollowListComponent";
import FollowersAPI from "../../api/FollowersAPI";
import {CircularProgress} from "@mui/material";

export default function ProfileSearchComponent({profileData, isFollowing, onFollowToggle,loadingFollow, onSendMessage,username}) {
    const [getAllFollowers, setGetAllFollowers] = useState([]);
    const [getAllFollowing, setGetAllFollowing] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);


    const fetchFollowingAndFollowers = async () => {
        try {
            const api = new FollowersAPI();
            await api.fetchFollowingAndFollowers(username,setGetAllFollowers,setGetAllFollowing);
        } catch (error) {
            console.log("Error to fetching data", error);
        }
    };

    const handleShowFollowers = () => {
        fetchFollowingAndFollowers();
        setShowFollowers(true);
    };

    const handleShowFollowing = () => {
        fetchFollowingAndFollowers();
        setShowFollowing(true);
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-picture">
                    <img
                        src={profileData.profilePicture ? profileData.profilePicture : img_null}
                        alt="Profile"
                    />
                </div>

                <div className="profile-info">
                    <h1>
                        <strong>{profileData.username ? profileData.username.toLocaleUpperCase() : "Loading..."}</strong>
                        &nbsp; &nbsp;

                        <button
                            onClick={onFollowToggle}
                            className={"btn btn-primary"}
                            style={{fontSize: "12px",width: "70px",}}
                            disabled={loadingFollow}
                        >
                            <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                               {loadingFollow ? <CircularProgress size={16} color="inherit"/> : isFollowing ? "Unfollow" : "Follow"}
                           </span>
                        </button>


                        &nbsp; &nbsp;
                        <button
                            onClick={onSendMessage}
                            className={"btn btn-primary"}
                            style={{fontSize: "12px"}}
                        >
                            Message
                        </button>
                    </h1>

                    <br/>
                    <p>
                        posts <strong>{profileData.posts.length}</strong> &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                            className="btn btn-link"
                            onClick={handleShowFollowers}
                            style={{fontSize: "15px", textDecoration: "none", color: "#555"}}
                        >
                            followers <strong>{profileData.followers}</strong>
                        </button>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                            className="btn btn-link"
                            onClick={handleShowFollowing}
                            style={{fontSize: "15px", textDecoration: "none",color:"#555"}}
                        >
                            following <strong>{profileData.following}</strong>
                        </button>
                    </p>
                </div>
            </div>

            <div>
                {profileData.posts.length > 0 ? <Post posts={profileData.posts} /> : <p>No posts available.</p>}
            </div>

            {showFollowers && (
                <FollowListComponent title="Followers" list={getAllFollowers} onClose={() => setShowFollowers(false)}/>
            )}

            {showFollowing && (
                <FollowListComponent title="Following" list={getAllFollowing} onClose={() => setShowFollowing(false)}/>
            )}
        </div>
    );
}
