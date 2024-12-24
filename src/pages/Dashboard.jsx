import React, {useEffect, useState} from "react";
import UsernameAPI from "../api/UsernameAPI";
import axios from "axios";
import {URL_GET_POST_HOME_FEED, URL_SERVER_SIDE} from "../utils/Constants";
import FormatDate from "../utils/FormatDate";
import "../css/DashboardStyle.css"

export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);


    const fetchUserDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const fetchHomeFeedPosts = async () => {
       try {
           const response = await axios.get(URL_SERVER_SIDE + URL_GET_POST_HOME_FEED + `/${username}`);
           if (response.data.success) {
               const postsR = response.data.postList;
               setPosts((prevPosts) => [...prevPosts, ...postsR]);
               setLoading(false);
           }
       }catch (error){
           console.error("Failed: error to fetch home feed posts",error);
       }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
            if (username) {
                fetchHomeFeedPosts();
            }
        },
        [username]);


    if (loading) {
        return (
            <div>
                <strong style={{color: "blue"}}>Loading...</strong>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    /*
     if (error) {
        return <p style={{color: "red"}}>{error}</p>;
     }
     */


    return (
        <div className="feed-container">
            <div className="alert alert-link" role="alert">
                <h1 style={{color: "blue", fontFamily: 'Brush Script MT'}}><strong>
                    Welcome to your Home Feed, {username || "Guest"}!
                </strong></h1>
            </div>
            {
                <div className="posts-grid">
                    {posts && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <div className="post-card" key={index}>
                                <div className="post-header">
                                    <div className="post-user-info">
                                        <img
                                            src={post.profilePicture || "/image/logoNetWork.png"}
                                            alt="User Profile"
                                            className="post-profile-picture"
                                        />
                                        <p><strong>{post.username}</strong></p>
                                    </div>
                                    <p className="post-date">{FormatDate(post.date)}</p>
                                </div>
                                <div className="post-content">
                                    {post.imageUrl && (
                                        <img src={post.imageUrl} alt="Post" className="post-image"/>
                                    )}
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No posts available...</p>
                    )}
                </div>
            }
        </div>
    );
}
