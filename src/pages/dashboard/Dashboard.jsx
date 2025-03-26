import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    MAX_SCROLL, NAV_PROFILE, NAV_PROFILE_SEARCH_BASE, TIME_HOME_FEED, TIME_LIKE, URL_GET_ALL_LIKES_POST,
    URL_GET_POST_HOME_FEED,
    URL_LIKE,
    URL_SERVER_SIDE,
    URL_UNLIKE
} from "../../utils/Constants";
import img_null from "../../assets/navbar/User_Profile_null.png"

import {RefreshCw} from 'lucide-react';
import UsernameAPI from "../../api/UsernameAPI";
import FormatDate from "../../utils/FormatDate";
import {IconCheck, IconAlertCircle} from '@tabler/icons-react';
import Comment from "../../components/dashboard/Comment";
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import LikeListComponent from "../../components/dashboard/LikeListComponent";
import {Tooltip, CircularProgress} from "@mui/material";
import "../../styles/loaders/LoadingGeneral.css"
import Stories from "../../components/dashboard/Stories";
import PostUploader from "../../components/dashboard/PostUploader";
import {Heart, MessageCircle} from "lucide-react";
import SuggestedFriends from "../../components/dashboard/SuggestedFriends";
import OnlineFriends from "../../components/dashboard/OnlineFriends";
import PostSkeleton from "../../components/loaders/PostSkeleton";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";


export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [likesList, setLikesList] = useState([]);
    const [showLikes, setShowLikes] = useState(false);
    const navigate = useNavigate();
    const [loadingLikeId, setLoadingLikeId] = useState(null);


    const fetchUserDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername, setProfilePicture);
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
                    setTimeout(() => {
                        setHasMore(false);
                    }, 150);
                } else {

                    const preloadImages = postDto.map(post =>
                        new Promise((resolve, reject) => {
                            const img = new Image();
                            img.src = post.imageUrl;
                            img.onload = resolve;
                            img.onerror = reject;
                        })
                    );

                    await Promise.all(preloadImages);

                    setPosts((prevPosts) => [...prevPosts, ...postDto]);
                    setPage((prevPage) => prevPage + 1);
                }
            } else {
                console.warn("No more posts to fetch.");
                setTimeout(() => {
                    setHasMore(false);
                }, 50);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setTimeout(() => {
                setIsFetching(false);
            }, TIME_HOME_FEED);
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

    const handleLikeToggle = async (postId, likedByUser) => {
        setLoadingLikeId(postId);
        try {
            if (likedByUser) {
                const response = await axios.delete(URL_SERVER_SIDE + URL_UNLIKE + `/${postId}&${username}`);
                console.log(response.data.error);
            } else {
                const response = await axios.post(URL_SERVER_SIDE + URL_LIKE + `/${postId}&${username}`);
                console.log(response.data.error);

            }

            const response = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_LIKES_POST + `/${postId}`);
            if (response.data.success) {
                const updatedLikes = response.data.likeDtos;
                setTimeout(() => {
                    setLoadingLikeId(null);
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
                }, TIME_LIKE);
            }
        } catch (error) {
            console.error("Error to fetching likes.", error);
            setLoadingLikeId(null);
        }
    }

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !isFetching) {
            fetchHomeFeedPosts()
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [hasMore, isFetching]);

    useEffect(() => {
        fetchUserDetails();
    }, []);


    useEffect(() => {
        if (username) {
            console.log("Username updated:", username);
            console.log("Page updated:", page);
            fetchHomeFeedPosts();
        }
    }, [username, page]);


    const handleUserClick = (usernameSearch) => {
        if (usernameSearch === username) {
            navigate(NAV_PROFILE);
            return;
        }

        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };


    const handleNavComment = (postId) => {
        setSelectedPostId((prev) => (prev === postId ? null : postId));
    };

    const handleIncrementCommentCount = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {...post, commentCount: post.commentCount + 1}
                    : post
            )
        );
    };

    const renderErrorMessage = () => {
        if (isFetching) {
            return (
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <>
                            {[...Array(1)].map((_, index) => (
                                <PostSkeleton key={index}/>
                            ))}
                        </>
                    </AnimatePresence>
                </div>
            );
        }

        if (!hasMore && posts.length > 0) {
            return (
                <div className="message-container-dash">
                    <p className="message-text-dash flex items-center gap-2 justify-center">
                        You've reached the end. Enjoy your feed.
                        <IconCheck size={24} stroke={2} className="check-icon"/>
                    </p>

                    <div className="message-text-dash flex items-center gap-2 justify-center mt-2">
                        Back to top
                        <span className="top"><a href={"#top"}>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                                <RefreshCw className="text-gray-600 w-5 h-5 transition-transform hover:rotate-180"/>
                            </button>
                        </a>
                        </span>
                    </div>
                </div>

            );
        }
        if (!isFetching && posts.length === 0) {
            return (
                <>
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            <>
                                {[...Array(1)].map((_, index) => (
                                    <PostSkeleton key={index}/>
                                ))}
                            </>
                        </AnimatePresence>
                    </div>
                    <div className="message-container-dash">
                        <p className="message-text-dash flex items-center gap-2 justify-center">
                            No posts available at the moment. Check back later.
                            <IconAlertCircle size={24} stroke={2} className="alert-icon"/>
                        </p>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container max-w-screen-xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row lg:space-x-6">


                    <div className="flex-1 space-y-4">
                        <Stories username={username}/>
                        <PostUploader
                            username={username}
                            profilePicture={profilePicture}
                            refreshPosts={() => {
                                setPage(0);
                                setPosts([]);
                                setHasMore(true);
                            }}
                        />


                        <div className="space-y-8">
                            <AnimatePresence mode="wait">
                                <>
                                    {(posts && posts.length > 0) && (
                                        posts.map((post, index) => (
                                            <motion.div
                                                layout
                                                key={post.id}
                                                initial={{opacity: 0, y: 30}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 30}}
                                                transition={{duration: 0.4, ease: "easeOut", delay: index * 0.05}}
                                                className="bg-white rounded-xl shadow-sm overflow-hidden"
                                            >


                                                <div className="p-4 flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar
                                                            className="w-12 h-12 rounded-full cursor-pointer"
                                                            src={post.profilePicture || img_null}
                                                            alt={post.username}
                                                            onClick={() => handleUserClick(post.username)}
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-base cursor-pointer hover:underline"
                                                               onClick={() => handleUserClick(post.username)}>
                                                                {post.username}
                                                            </p>
                                                            <p className="text-xs text-gray-500">{FormatDate(post.date)}</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-gray-500 text-xl">•••</button>
                                                </div>


                                                {post.imageUrl && (
                                                    <div
                                                        className="w-full bg-gray-100 flex justify-center items-center">
                                                        <img
                                                            src={post.imageUrl}
                                                            alt="Post content"
                                                            className="max-w-full max-h-[600px] object-contain"
                                                        />
                                                    </div>

                                                )}


                                                <div className="p-4 space-y-3">


                                                    <div className="flex items-center space-x-4">


                                                        {loadingLikeId === post.id ? (
                                                            <CircularProgress size={18} thickness={6}
                                                                              style={{
                                                                                  color: "red",
                                                                                  marginBottom: "-5px"
                                                                              }}/>
                                                        ) : (
                                                            <Tooltip title={post.likedByUser ? "Unlike" : "Like"}>
                                                                <div
                                                                    className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition"
                                                                    onClick={() => handleLikeToggle(post.id, post.likedByUser)}
                                                                >
                                                                    {post.likedByUser ? (
                                                                        <Heart
                                                                            className="h-5 w-5 fill-red-500 text-red-500"/>
                                                                    ) : (
                                                                        <Heart
                                                                            className="h-5 w-5 text-gray-700 hover:text-red-500"/>
                                                                    )}
                                                                </div>
                                                            </Tooltip>
                                                        )}


                                                        <Tooltip title="Add Comment">
                                                            <div
                                                                className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 transition"
                                                                onClick={() => handleNavComment(post.id)}
                                                            >
                                                                <MessageCircle
                                                                    className="h-5 w-5 text-gray-700 hover:text-blue-500"/>
                                                            </div>
                                                        </Tooltip>

                                                    </div>



                                                    <div
                                                        className="flex items-center text-sm text-gray-700 space-x-4">
                                                        <button className="flex items-center space-x-1"
                                                                onClick={() => fetchAllLikes(post.id)}>
                                                                <span
                                                                    className="font-semibold">{post.likesCount || 0}</span>
                                                            <span>Likes</span>
                                                        </button>
                                                        <button className="flex items-center space-x-1"
                                                                onClick={() => handleNavComment(post.id)}>
                                                                <span
                                                                    className="font-semibold">{post.commentCount || 0}</span>
                                                            <span>Comments</span>
                                                        </button>
                                                    </div>


                                                    <div className="text-sm">
                                                <span className="font-semibold mr-2 cursor-pointer"
                                                      onClick={() => handleUserClick(post.username)}>
                                                    {post.username}
                                                </span>
                                                        {post.content}
                                                    </div>
                                                    <br/>


                                                    {selectedPostId === post.id && (
                                                        <Comment
                                                            postId={post.id}
                                                            username={username}
                                                            commentCount={post.commentCount}
                                                            profilePicture={profilePicture}
                                                            onCommentAdded={() => handleIncrementCommentCount(post.id)}
                                                        />
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </>
                            </AnimatePresence>
                        </div>

                        {renderErrorMessage()}
                    </div>


                    <div className="lg:w-[320px] flex-shrink-0 space-y-6 mt-6 lg:mt-0">
                        <div className="sticky top-5 space-y-6">
                            <SuggestedFriends currentUsername={username}/>
                            <OnlineFriends username={username}/>
                        </div>
                    </div>

                </div>
            </div>

            {showLikes && (
                <LikeListComponent
                    likesList={likesList}
                    username={username}
                    onClose={() => setShowLikes(false)}/>
            )}
        </div>
    );
}