import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {MAX_SCROLL, URL_GET_POST_HOME_FEED, URL_SERVER_SIDE} from "../utils/Constants";
import "../css/DashboardStyle.css";
import UsernameAPI from "../api/UsernameAPI";
import FormatDate from "../utils/FormatDate";
import {IconMoodEmpty,IconMoodSmile} from '@tabler/icons-react';



export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const feedContainerRef = useRef(null);


    const fetchUserDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    const fetchHomeFeedPosts = async () => {
        if (isFetching || !hasMore || !username) {
            return;
        }

        setIsFetching(true);

        try {
            const response = await axios.get(
                URL_SERVER_SIDE + URL_GET_POST_HOME_FEED + `/${username}?page=${page}&size=${MAX_SCROLL}`
            );

            if (response.data.success) {
                const postsR = response.data.postList;

                if (postsR.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...postsR]);
                }
            } else {
                console.warn("No more posts to fetch.");
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsFetching(false);
        }
    };


    useEffect(() => {
        fetchUserDetails();
    }, []);


    useEffect(() => {
        if (username) {
            console.log("Username updated:", username);
            fetchHomeFeedPosts();
        }
    }, [username]);


    useEffect(() => {
        if (username) {
            fetchHomeFeedPosts();
        }
    }, [page]);


    const handleScroll = () => {
        const container = feedContainerRef.current;

        if (!container) {
            console.log("Container not found");
            return;
        }

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;


        if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !isFetching) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const container = feedContainerRef.current;

        if (container) {
            console.log("Adding scroll event listener to container");
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                console.log("Removing scroll event listener from container");
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [hasMore, isFetching]);

    const renderErrorMessage = () => {
        if (isFetching) {
            return (
                <div style={{textAlign: "center"}}>
                    <p style={{textAlign: "center", color: "gray" , fontSize: "25px"}}>
                        Loading more posts...
                    </p>
                    <div className="spinner-border text-secondary" role="status">
                    </div>
                </div>

            );
        }
        if (!hasMore && posts.length > 0) {
            return (
                <div>
                    <p style={{textAlign: "center", color: "gray" , fontSize: "25px"}}>
                        No more posts to display. <IconMoodSmile stroke={2} size={"30px"}/>
                    </p>
                </div>
            );
        }
        if (!isFetching && posts.length === 0) {
            return (
                <div>
                    <p style={{textAlign: "center", color: "gray", fontSize: "25px"}}>
                        No posts available...<IconMoodEmpty stroke={2} size={"30px"}/>
                    </p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="feed-container" ref={feedContainerRef}>
            <div className="alert alert-link" role="alert">
                <h1 style={{color: "blue", fontFamily: "Brush Script MT"}}>
                    <strong>Welcome to your Home Feed, {username || "Guest"}!</strong>
                </h1>
            </div>
            <div className="posts-grid">
                {(posts && posts.length > 0) && (
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
                )}
            </div>
            {renderErrorMessage()}
        </div>
    );
}
