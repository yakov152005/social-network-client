import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {
    MAX_SCROLL, NAV_PROFILE, NAV_PROFILE_SEARCH_BASE, URL_GET_ALL_LIKES_POST,
    URL_GET_POST_HOME_FEED,
    URL_LIKE,
    URL_SERVER_SIDE,
    URL_UNLIKE
} from "../../utils/Constants";
import "../../css/dashboard/DashboardStyle.css";
import img_null from "../../assets/navbar/User_Profile_null.png"

import UsernameAPI from "../../api/UsernameAPI";
import FormatDate from "../../utils/FormatDate";
import {IconMoodEmpty,IconMoodSmile, IconHeart,IconHeartFilled, IconMessageCircle } from '@tabler/icons-react';
import Comment from "../../components/dashboard/Comment";
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import LikeListComponent from "../../components/dashboard/LikeListComponent";
import {Tooltip} from "@mui/material";


export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [likesList, setLikesList] = useState([]);
    const [showLikes, setShowLikes] = useState(false);
    const feedContainerRef = useRef(null);
    const navigate = useNavigate();


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
                const postDto = response.data.postList;
                if (postDto.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...postDto]);
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

    const fetchAllLikes = async (postId) => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_LIKES_POST + `/${postId}`);
            if (response.data.success) {
                setLikesList(response.data.likeDtos);
                setShowLikes(true);
            }
        } catch (error) {
            console.error("Error fetching likes", error);
        }
    };

    const handleLikeToggle = async (postId,likedByUser) => {
        try {
            if (likedByUser){
                const response = await axios.delete(URL_SERVER_SIDE + URL_UNLIKE + `/${postId}&${username}`);
                console.log(response.data.error);
            }else {
                const response = await axios.post(URL_SERVER_SIDE + URL_LIKE + `/${postId}&${username}`);
                console.log(response.data.error);

            }

            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_LIKES_POST + `/${postId}`);
            if (response.data.success) {
                const updatedLikes = response.data.likeDtos;
                setPosts((prevPosts) =>
                    prevPosts.map((post) => post.id === postId ?
                        {
                            ...post,
                            likedByUser: !likedByUser,
                            likesCount: post.likedByUser ? post.likesCount - 1 : post.likesCount + 1,
                                likes: updatedLikes,
                        }
                        : post
                    ));
            }

        }catch (error){
            console.error("Error to fetching likes.",error);
        }
    }


    const handleScroll = async () => {
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


    const handleUserClick = (usernameSearch) => {
        if (usernameSearch === username){
            navigate(NAV_PROFILE);
            return;
        }

        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };


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

    const handleNavComment = (postId) => {
        setSelectedPostId((prev) => (prev === postId ? null : postId));
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
                                        src={post.profilePicture || img_null}
                                        alt="User Profile"
                                        className="post-profile-picture"
                                        onClick={() => handleUserClick(post.username)}
                                    />
                                    <p><strong onClick={() => handleUserClick(post.username)}>{post.username}</strong></p>
                                </div>
                                <p className="post-date">{FormatDate(post.date)}</p>
                            </div>
                            <div className="post-content">
                                {post.imageUrl && (
                                    <img src={post.imageUrl} alt="Post" className="post-image"/>
                                )}
                            </div>

                            <div className="like-section">
                                {post.likedByUser ? (
                                    <Tooltip title="Unlike">
                                        <IconHeartFilled
                                        style={{cursor: "pointer", color: "red"}}
                                        onClick={() => handleLikeToggle(post.id, post.likedByUser)}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Like">
                                        <IconHeart
                                            stroke={2}
                                            style={{cursor: "pointer", color: "gray"}}
                                            onClick={() => handleLikeToggle(post.id, post.likedByUser)}
                                        />
                                    </Tooltip>
                                )}
                                <Tooltip title="Add Comment">
                                    <IconMessageCircle
                                        stroke={2}
                                        style={{cursor: "pointer", color: "gray", marginLeft: "7px"}}
                                        onClick={() => handleNavComment(post.id)}
                                    />
                                </Tooltip>
                                <br/>

                                <AvatarGroup
                                    spacing="small"
                                    max={3}
                                    onClick={() => fetchAllLikes(post.id)}
                                    className="custom-avatar-group"
                                >
                                    {post.likes.map((like) => (
                                        <Avatar
                                            key={like.id}
                                            alt={like.username}
                                            src={like.profilePicture || img_null}
                                        />
                                    ))}
                                </AvatarGroup>

                                <p><strong  onClick={() => fetchAllLikes(post.id)} style={{cursor:"pointer"}}>
                                    {post.likesCount || 0} likes
                                </strong></p>

                                <p><strong
                                    style={{cursor: "pointer"}}
                                    onClick={() => handleUserClick(post.username)}>
                                    {post.username} &nbsp;&nbsp;</strong>
                                    {post.content}
                                </p>
                            </div>

                            {selectedPostId === post.id && (
                                <Comment
                                    postId={post.id}
                                    username={username}
                                    commentCount={post.commentCount}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>

            {renderErrorMessage()}

            {showLikes && (
                <LikeListComponent
                    likesList={likesList}
                    username={username}
                    onClose={() => setShowLikes(false)}
                />
            )}
        </div>
    );
}


