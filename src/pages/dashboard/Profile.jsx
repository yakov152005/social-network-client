import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    URL_ADD_POST,
    URL_ADD_PROFILE_PIC, URL_ALL_FOLLOW_NUM,
    URL_GET_POST_PROFILE,
    URL_GET_PROFILE_PIC,
    URL_SERVER_SIDE
} from "../../utils/Constants";
import UsernameAPI from "../../api/UsernameAPI";
import "../../css/dashboard/ProfileStyle.css"
import Post from "../../components/dashboard/Post";
import Swal from "sweetalert2";
import img_null from "../../assets/navbar/User_Profile_null.png"
import FollowersAPI from "../../api/FollowersAPI";
import FollowListComponent from "../../components/dashboard/FollowListComponent";


export default function Profile() {
    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({content: "", imageUrl: ""});
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [currentProfilePicture, setCurrentProfilePicture] = useState("");
    const [followers, setFollowers] = useState(-1);
    const [following, setFollowing] = useState(-1);
    const [getAllFollowers, setGetAllFollowers] = useState([]);
    const [getAllFollowing, setGetAllFollowing] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };


    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_POST_PROFILE + `/${username}`);
            if (response.data.success) {
                console.log(response.data.postList)
                setPosts(response.data.postList || []);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Failed to load posts", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfilePicture = async  () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_PROFILE_PIC + `/${username}`);
            if (response.data.success){
                setCurrentProfilePicture(response.data.profilePicture);
                console.log(currentProfilePicture)
            }else {
                console.log(response.data.error);
            }


        }catch (error){
            console.error("Failed to  fetch profile picture.",error);
        }
    }

    const fetchFollowsNumber = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_ALL_FOLLOW_NUM + `/${username}`);
            if (response.data.success){
                console.log(response.data.error);
                setFollowers(response.data.followers);
                setFollowing(response.data.following);
            }else {
                console.log(response.data.error);
            }

        }catch (error){
            console.log("Error to fetching follows",error);
        }
    }


    const addPost = async () => {
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_POST + `/${username}`,
                newPost);
            if (response.data.success) {
                await Swal.fire({
                    title: "Good job!",
                    text: "Post added successfully!",
                    icon: "success",
                });
                console.log(response.data.error);
                setNewPost({content: "", imageUrl: ""});
                fetchPosts();
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "The post must have image, try again.",
                    icon: "error",
                });
                console.error(response.data.error);
            }
        } catch (error) {
            await Swal.fire({
                title: "Error",
                text: "An unexpected error occurred. Please try again later.",
                icon: "error",
            });
            console.error("Failed to add post", error);
        }
    };

    const addProfilePicture = async () => {
        if (!profilePicture || profilePicture.length === 0 || !profilePicture.startsWith("http")) {
            await Swal.fire({
                title: "Error",
                text: "Please choose a valid profile picture URL.",
                icon: "error",
            });
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_PROFILE_PIC, {
                username: username,
                profilePicture: profilePicture,
            });

            if (response.data.success) {
                fetchProfilePicture();
                await Swal.fire({
                    title: "Good job!",
                    text: "Profile picture added successfully!",
                    icon: "success",
                });
                setProfilePicture("");
                console.log(response.data.error);
            } else {
                console.log("Error uploading profile picture.");
                await Swal.fire({
                    title: "Error",
                    text: "Failed to upload profile picture. Please try again.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Failed to fetch and add picture.", error);
            await Swal.fire({
                title: "Error",
                text: "An unexpected error occurred. Please try again later.",
                icon: "error",
            });
        }
    };


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

    useEffect(() => {
        fetchDetails();
    }, []);


    useEffect(() => {
        if (username) {
            fetchPosts();
            fetchProfilePicture();
            fetchFollowsNumber();
        }
    }, [username]);


    if (loading) {
        return (
            <div>
                <strong style={{color: "blue"}}>Loading...</strong>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }


    const handleChange = (event) => {
        setProfilePicture(event.target.value);
    };


    return (
        <div className="profile-container">
            <div className="alert alert-link" role="alert">
                <h1 style={{color: "blue", fontFamily: 'Brush Script MT'}}><strong>
                    Welcome to your Profile, {username || "Guest"}!
                </strong></h1>
            </div>
            <div className="profile-header">
                <div className="profile-picture">
                    <img
                        src={currentProfilePicture || img_null}
                        alt="Profile"
                    />
                </div>

                <div className="profile-info">
                    <h1><strong>{username ? username.toLocaleUpperCase() : "Loading..."}</strong></h1>
                    <p>posts <strong>{posts.length}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        <button
                            className="btn btn-link"
                            onClick={handleShowFollowers}
                            style={{textDecoration: "none" ,color:"#555"}}
                        >
                            followers <strong>{followers}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        </button>
                        <button
                            className="btn btn-link"
                            onClick={handleShowFollowing}
                            style={{textDecoration: "none",color:"#555"}}
                        >
                            following <strong>{following}</strong>
                        </button>
                    </p>
                </div>
            </div>


            <div>
                <h4><strong>Add a New Profile picture</strong></h4>
                <input
                    style={{borderRadius: "10px", border: "none"}}
                    type="text"
                    placeholder="Image URL"
                    value={profilePicture}
                    onChange={handleChange}
                />
                <br/><br/>
                <button className={"btn btn-success"} onClick={addProfilePicture} disabled={!username}>
                    Add Profile Picture
                </button>
            </div>
            <br/><br/>

            <div className="add-post-form" style={{borderBottom: " 1px solid #dbdbdb"}}>
                <h4><strong>Add a New Post</strong></h4>
                <textarea
                    style={{borderRadius: "10px", border: "none"}}
                    placeholder="Status"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}/>

                <br/>

                <input
                    style={{borderRadius: "10px", border: "none"}}
                    type="text"
                    placeholder="Image URL"
                    value={newPost.imageUrl}
                    onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                />

                <br/><br/>
                <button className={"btn btn-success"} onClick={addPost} disabled={!username}>
                    Add Post
                </button>
            </div>
            <br/>


            <div>
            {
                posts.length > 0 ? (
                    <Post posts={posts}/>
                ) : (
                    <p>No posts available.</p>
                )
            }
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
