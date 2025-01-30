import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {
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


export default function Profile() {
    const [username, setUsername] = useState("");
    const [currentProfilePicture, setCurrentProfilePicture] = useState("");
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({content: "", imageUrl: ""});
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [followers, setFollowers] = useState(-1);
    const [following, setFollowing] = useState(-1);
    const [getAllFollowers, setGetAllFollowers] = useState([]);
    const [getAllFollowing, setGetAllFollowing] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [showUploadeProfilePic, setShowUploadeProfilePic] = useState(false);
    const [showUploadePost, setShowUploadePost] = useState(false);


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername,setCurrentProfilePicture);
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
            });
            return;
        }

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
            });
            return;
        }

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
                });
                setSelectedFile(null);
                setProfilePicture("");
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "Failed to upload profile picture.",
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            await Swal.fire({
                title: "Error",
                text: "An unexpected error occurred.",
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
            fetchFollowsNumber();
        }
    }, [username]);


    if (loading) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "gray",
            }}>
                <strong style={{ fontSize: "24px", marginBottom: "20px" }}>Loading...</strong>
                <div className="spinner-border text-secondary" role="status" style={{ width: "3rem", height: "3rem" }}></div>
            </div>
        );
    }


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



            {showUploadeProfilePic ? (
                <>
                    <button className={"btn btn-outline-success"} onClick={() => {
                        setShowUploadeProfilePic(false)
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
                                className={"img-profile-uploade"}
                            />
                        )}


                        <button
                            onClick={addProfilePicture}
                            disabled={!username}
                            className={"btn btn-secondary"}
                        >
                            Add Profile Picture
                        </button>
                    </div>
                </>
            ) : (
                <button className={"btn btn-outline-success"} onClick={() => {
                    setShowUploadeProfilePic(true)
                }}>
                    Add Profile Picture
                </button>
            )}

            <br/><br/>

            {showUploadePost ? (
                <>
                    <button className={"btn btn-outline-success"} onClick={() => {
                        setShowUploadePost(false)
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

                        <button className={"btn btn-secondary"} onClick={addPost} disabled={!username}>
                            Add Post
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <button className={"btn btn-outline-success"} onClick={() => {
                        setShowUploadePost(true)
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
