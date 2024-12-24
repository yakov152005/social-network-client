import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_ADD_POST, URL_GET_POST_PROFILE, URL_SERVER_SIDE } from "../utils/Constants";
import UsernameAPI from "../api/UsernameAPI";
import "../css/ProfileStyle.css"
import Post from "../components/Post";

export default function Profile() {
    const [username, setUsername] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ content: "", imageUrl: "" });
    const [loading, setLoading] = useState(false);


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
                alert(response.data.error);
            }
        } catch (error) {
            console.error("Failed to load posts", error);
        } finally {
            setLoading(false);
        }
    };


    const addPost = async () => {
        try {
            const response = await axios.post(`${URL_SERVER_SIDE}${URL_ADD_POST}/${username}`, newPost);
            if (response.data.success) {
                alert("Post added successfully!");
                setNewPost({ content: "", imageUrl: "" });
                fetchPosts();
            } else {
                alert(response.data.error);
            }
        } catch (error) {
            console.error("Failed to add post", error);
        }
    };


    useEffect(() => {
        fetchDetails();
    }, []);


    useEffect(() => {
        if (username) {
            fetchPosts();
        }
    }, [username]);

    return (
        <div className="profile-container">

            <div className="profile-header">
                <div className="profile-picture">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                </div>
                <div className="profile-info">
                    <h1>{username || "Loading..."}</h1>
                    <p>Posts: {posts.length}</p>
                </div>
            </div>


            <div className="add-post-form">
                <h2>Add a New Post</h2>
                <textarea
                    placeholder="Post content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newPost.imageUrl}
                    onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                />
                <button onClick={addPost} disabled={!username}>
                    Add Post
                </button>
            </div>


            <div >
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length > 0 ? (
                   <Post posts={posts}/>
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}
