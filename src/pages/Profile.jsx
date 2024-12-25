import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    URL_ADD_POST,
    URL_ADD_PROFILE_PIC,
    URL_GET_POST_PROFILE,
    URL_GET_PROFILE_PIC,
    URL_SERVER_SIDE
} from "../utils/Constants";
import UsernameAPI from "../api/UsernameAPI";
import "../css/ProfileStyle.css"
import Post from "../components/Post";


export default function Profile() {
    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({content: "", imageUrl: ""});
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [currentProfilePicture, setCurrentProfilePicture] = useState("");



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


    const addPost = async () => {
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_POST + `/${username}`,
                newPost);
            if (response.data.success) {
                console.log(response.data.error);
                setNewPost({content: "", imageUrl: ""});
                fetchPosts();
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Failed to add post", error);
        }
    };

    const addProfilePicture = async () => {
        try {
            const response= await axios.post(URL_SERVER_SIDE + URL_ADD_PROFILE_PIC,{
                username: username,
                profilePicture: profilePicture,
            });
            if (response.data.success){
                fetchProfilePicture();
                setProfilePicture("");
                console.log(response.data.error);
            }else {
                console.log("Error to upload img.");
            }
        }catch (error){
            console.error("Failed to fetching add picture.",error);
        }
    }


    useEffect(() => {
        fetchDetails();
    }, []);


    useEffect(() => {
        if (username) {
            fetchPosts();
            fetchProfilePicture();
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
                        src={currentProfilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                    />
                </div>

                <div className="profile-info">
                    <h1><strong>{username ? username.toLocaleUpperCase() : "Loading..."}</strong></h1>
                    <p>posts <strong>{posts.length}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        followers <strong>{0}{/* לא לשכוח למלא פה עוקבים של המשתמש */}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        following <strong>{0}{/* לא לשכוח למלא פה נעקבים על ידי המשתמש */}</strong>
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
                    Add Post
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
        </div>
    );
}
