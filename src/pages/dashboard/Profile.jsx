import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {
    TIME_PROFILE,
    URL_ADD_POST,
    URL_ADD_PROFILE_PIC, URL_ALL_FOLLOW_NUM,
    URL_GET_POST_PROFILE,
    URL_SERVER_SIDE
} from "../../utils/Constants";
import UsernameAPI from "../../api/UsernameAPI";
import "../../css/dashboard/ProfileStyle.css"
import Post from "../../components/dashboard/Post";
import Swal from "sweetalert2";
import img_null from "../../assets/navbar/User_Profile_null.png"
import FollowersAPI from "../../api/FollowersAPI";
import FollowListComponent from "../../components/dashboard/FollowListComponent";
import {useDropzone} from "react-dropzone";
import "../../css/home/ForgetPasswordStyle.css"
import { motion } from "framer-motion";



export default function Profile() {
    const [username, setUsername] = useState("");
    const [currentProfilePicture, setCurrentProfilePicture] = useState("");
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({content: "", imageUrl: ""});
    const [loading, setLoading] = useState(false);
    const [loadingAddPost, setLoadingAddPost] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [getAllFollowers, setGetAllFollowers] = useState([]);
    const [getAllFollowing, setGetAllFollowing] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showUploadProfilePic, setShowUploadProfilePic] = useState(false);
    const [showUploadPost, setShowUploadPost] = useState(false);


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername,setCurrentProfilePicture);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };


    const fetchPosts = async () => {
        setLoading(true);

        try {
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
            setTimeout(()=>{
                setLoading(false);
            },TIME_PROFILE)
        }
    };


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
        if (!selectedFile && !newPost.imageUrl) {
            await Swal.fire({
                title: "Error",
                text: "Please choose a post picture.",
                icon: "error",
                background: "#1a1a2e",
                color: "#ffffff",
                confirmButtonColor: "#5269bc",
                customClass: {
                    popup: "swal-custom-popup",
                    container: "swal2-container",
                    title: "swal-custom-title",
                    confirmButton: "swal-custom-confirm",
                }
            });
            return;
        }
        setLoadingAddPost(true);

        let formDataPost = new FormData();
        formDataPost.append("username", username);
        formDataPost.append("content", newPost.content);

        if (selectedFile) {
            formDataPost.append("postImageFile", selectedFile);
        } else if (newPost.imageUrl.startsWith("http")) {
            formDataPost.append("postImageUrl", newPost.imageUrl);
        } else {
            await Swal.fire({
                title: "Error",
                text: "Invalid post picture format.",
                icon: "error",
                background: "#1a1a2e",
                color: "#ffffff",
                confirmButtonColor: "#5269bc",
                customClass: {
                    popup: "swal-custom-popup",
                    container: "swal2-container",
                    title: "swal-custom-title",
                    confirmButton: "swal-custom-confirm",
                }
            });
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_POST , formDataPost, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                await Swal.fire({
                    title: "Good job!",
                    text: "Post added successfully!",
                    icon: "success",
                    background: "#1a1a2e",
                    color: "#ffffff",
                    confirmButtonColor: "#5269bc",
                    customClass: {
                        popup: "swal-custom-popup",
                        container: "swal2-container",
                        title: "swal-custom-title",
                        confirmButton: "swal-custom-confirm",
                    }
                });
                console.log(response.data.error);
                setNewPost({content: "", imageUrl: ""});
                setSelectedFile(null);
                fetchPosts();
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "The post must have image, try again.",
                    icon: "error",
                    background: "#1a1a2e",
                    color: "#ffffff",
                    confirmButtonColor: "#5269bc",
                    customClass: {
                        popup: "swal-custom-popup",
                        container: "swal2-container",
                        title: "swal-custom-title",
                        confirmButton: "swal-custom-confirm",
                    }
                });
                console.error(response.data.error);
            }
        } catch (error) {
            await Swal.fire({
                title: "Error",
                text: "The image is too large for the format, try choosing a different image.",
                icon: "error",
                background: "#1a1a2e",
                color: "#ffffff",
                confirmButtonColor: "#5269bc",
                customClass: {
                    popup: "swal-custom-popup",
                    container: "swal2-container",
                    title: "swal-custom-title",
                    confirmButton: "swal-custom-confirm",
                }
            });
            console.error("Failed to add post", error);
        }
        setLoadingAddPost(false);
    };


    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setSelectedFile(file);
            setProfilePicture("");
            setNewPost({content: "", imageUrl: ""});
        }
    }, []);



    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 1
    });


    const addProfilePicture = async () => {
        if (!selectedFile && !profilePicture) {
            await Swal.fire({
                title: "Error",
                text: "Please choose a profile picture.",
                icon: "error",
                background: "#1a1a2e",
                color: "#ffffff",
                confirmButtonColor: "#5269bc",
                customClass: {
                    popup: "swal-custom-popup",
                    container: "swal2-container",
                    title: "swal-custom-title",
                    confirmButton: "swal-custom-confirm",
                }
            });
            return;
        }
        setLoadingAddPost(true);

        let formData = new FormData();
        formData.append("username", username);

        if (selectedFile) {
            formData.append("profilePictureFile", selectedFile);
        } else if (profilePicture.startsWith("http")) {
            formData.append("profilePictureUrl", profilePicture);
        } else {
            await Swal.fire({
                title: "Error",
                text: "Invalid profile picture format.",
                icon: "error",
                background: "#1a1a2e",
                color: "#ffffff",
                confirmButtonColor: "#5269bc",
                customClass: {
                    popup: "swal-custom-popup",
                    container: "swal2-container",
                    title: "swal-custom-title",
                    confirmButton: "swal-custom-confirm",
                }
            });
            return;
        }

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_PROFILE_PIC, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                setCurrentProfilePicture(selectedFile ? URL.createObjectURL(selectedFile) : profilePicture);
                await Swal.fire({
                    title: "Success!",
                    text: "Profile picture updated successfully.",
                    icon: "success",
                    background: "#1a1a2e",
                    color: "#ffffff",
                    confirmButtonColor: "#5269bc",
                    customClass: {
                        popup: "swal-custom-popup",
                        container: "swal2-container",
                        title: "swal-custom-title",
                        confirmButton: "swal-custom-confirm",
                    }
                });
                setSelectedFile(null);
                setProfilePicture("");
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "Failed to upload profile picture.",
                    icon: "error",
                    background: "#1a1a2e",
                    color: "#ffffff",
                    confirmButtonColor: "#5269bc",
                    customClass: {
                        popup: "swal-custom-popup",
                        container: "swal2-container",
                        title: "swal-custom-title",
                        confirmButton: "swal-custom-confirm",
                    }
                });
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            await Swal.fire({
                title: "Error",
                text: "The image is too large for the format, try choosing a different image.",
                icon: "error",
                background: "#1a1a2e",
                color: "#ffffff",
                confirmButtonColor: "#5269bc",
                customClass: {
                    popup: "swal-custom-popup",
                    container: "swal2-container",
                    title: "swal-custom-title",
                    confirmButton: "swal-custom-confirm",
                }
            });
        }
        setLoadingAddPost(false);
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
            fetchFollowsNumber();
        }
    }, [username]);


    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-200">

                <motion.h2
                    className="text-2xl font-bold text-blue-600 mb-5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Profile...
                </motion.h2>


                <motion.div
                    className="w-16 h-16 border-4 border-solid border-blue-400 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{
                        boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.5)"
                    }}
                />


                <motion.div
                    className="mt-5 text-sm text-blue-600 mb-5"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    Please wait while we load your profile...
                </motion.div>
            </div>
        );
    }


    return (
        <div className="profile-container">
            {/* <div className="alert alert-link" role="alert">
                <h1 style={{color: "blue", fontFamily: 'Brush Script MT'}}><strong>
                    Welcome to your Profile, {username || "Guest"}!
                </strong></h1>
            </div> */}
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
                            style={{textDecoration: "none", color: "#555"}}
                        >
                            followers <strong>{followers}</strong> &nbsp; &nbsp;  &nbsp; &nbsp;
                        </button>
                        <button
                            className="btn btn-link"
                            onClick={handleShowFollowing}
                            style={{textDecoration: "none", color: "#555"}}
                        >
                            following <strong>{following}</strong>
                        </button>
                    </p>
                </div>
            </div>



            {showUploadProfilePic ? (
                <>
                    <button className={"btn btn-outline-success"} onClick={() => {
                        setShowUploadProfilePic(false)
                    }}>
                        Hide Add Profile Picture
                    </button>
                    <div className={"box-drop-zone"}>
                        <h4><strong>Add a New Profile Picture</strong></h4>


                        <div {...getRootProps()} className={"div-select-file"}>
                            <input {...getInputProps()} />
                            {selectedFile ? (
                                <p>{selectedFile.name}</p>
                            ) : (
                                <p style={{color: "gray"}}>Drag & Drop an image or click to select</p>
                            )}
                        </div>

                        <p className={"or-text"}>—————————— or ——————————</p>

                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={profilePicture}
                            onChange={(e) => {
                                setProfilePicture(e.target.value);
                                setSelectedFile(null);
                            }}
                           className={"input-url-profile"}
                        />


                        {(selectedFile || profilePicture) && (
                            <img
                                src={selectedFile ? URL.createObjectURL(selectedFile) : profilePicture}
                                alt="Preview"
                                className={"img-profile-upload"}
                            />
                        )}


                        <button
                            onClick={addProfilePicture}
                            disabled={!username || loadingAddPost}
                            className={"btn btn-secondary"}
                        >
                            {loadingAddPost ? "Processing...⌛" : "Add Profile Picture ✅"}
                        </button>
                    </div>
                </>
            ) : (
                <button className={"btn btn-outline-success"} onClick={() => {
                    setShowUploadProfilePic(true)
                }}>
                    Add Profile Picture
                </button>
            )}

            <br/><br/>

            {showUploadPost ? (
                <>
                    <button className={"btn btn-outline-success"} onClick={() => {
                        setShowUploadPost(false)
                    }}>
                        Hide Add Post
                    </button>
                    <div className="box-drop-zone">
                        <h4><strong>Add a New Post</strong></h4>
                        <textarea
                            className={"input-url-profile"}
                            placeholder="Status"
                            value={newPost.content}
                            onChange={(e) => setNewPost({...newPost, content: e.target.value})}/>

                        <input
                            className={"input-url-profile"}
                            type="text"
                            placeholder="Image URL"
                            value={newPost.imageUrl || null}
                            onChange={(e) => {
                                setNewPost({...newPost, imageUrl: e.target.value})
                                setSelectedFile(null);
                            }}

                        />

                        <p className={"or-text"}>—————————— or ——————————</p>

                        <div {...getRootProps()} className={"div-select-file"}>
                            <input {...getInputProps()} />
                            {selectedFile ? (
                                <p>{selectedFile.name}</p>
                            ) : (
                                <p style={{color: "gray"}}>Drag & Drop an image or click to select</p>
                            )}
                        </div>

                        <button className={"btn btn-secondary"} onClick={addPost} disabled={!username || loadingAddPost}>
                            {loadingAddPost ? "Processing...⌛" : "Add Post ✅"}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <button className={"btn btn-outline-success"} onClick={() => {
                        setShowUploadPost(true)
                    }}>
                        Add Post
                    </button>
                </>
            )}
            <br/>

            <div style={{borderBottom: " 1px solid #dbdbdb", marginBottom: "15px", marginTop:"20px"}}></div>

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
