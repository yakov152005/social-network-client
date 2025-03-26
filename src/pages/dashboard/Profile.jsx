import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/Dialog";
import { Button } from "../../components/ui/Button";
import { Camera, Grid, Film, Tag } from "lucide-react";
import { useDropzone } from "react-dropzone";
import FollowListComponent from "../../components/dashboard/FollowListComponent";
import Swal from "sweetalert2";
import img_null from "../../assets/navbar/User_Profile_null.png";
import UsernameAPI from "../../api/UsernameAPI";
import FollowersAPI from "../../api/FollowersAPI";
import PostGrid from "../../components/dashboard/PostGrid";
import {
    URL_ADD_PROFILE_PIC,
    URL_SERVER_SIDE,
    URL_GET_POST_PROFILE,
    URL_ALL_FOLLOW_NUM,
    TIME_PROFILE
} from "../../utils/Constants";
import ProfileSkeleton from "../../components/loaders/ProfileSkeleton";
import {Avatar} from "../../components/ui/Avatar";
import {AnimatePresence} from "framer-motion";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [currentProfilePicture, setCurrentProfilePicture] = useState("");
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [bio, setBio] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [getAllFollowers, setGetAllFollowers] = useState([]);
    const [getAllFollowing, setGetAllFollowing] = useState([]);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [activeTab, setActiveTab] = useState("posts");
    const [loadingAddProfile, setLoadingAddProfile] = useState(false);

    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername, setCurrentProfilePicture, setBio,null, setFullName);
        } catch (error) {
            console.error("Failed to load user details", error);
        }
    };

    const fetchPosts = async () => {
        setIsLoading(true);

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
            setTimeout(() => {
                setIsLoading(false);
            }, TIME_PROFILE)
        }
    };

    const fetchFollowsNumber = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_ALL_FOLLOW_NUM + `/${username}`);
            if (response.data.success) {
                setFollowers(response.data.followers);
                setFollowing(response.data.following);
            }
        } catch (error) {
            console.error("Error fetching follows", error);
        }
    };

    const fetchFollowingAndFollowers = async () => {
        try {
            const api = new FollowersAPI();
            await api.fetchFollowingAndFollowers(username, setGetAllFollowers, setGetAllFollowing);
        } catch (error) {
            console.error("Error fetching followers/following", error);
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

    const addProfilePicture = async () => {
        if (!selectedFile && !profilePictureUrl) {
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

        setLoadingAddProfile(true);

        let formData = new FormData();
        formData.append("username", username);

        if (selectedFile) {
            formData.append("profilePictureFile", selectedFile);
        } else if (profilePictureUrl.startsWith("http")) {
            formData.append("profilePictureUrl", profilePictureUrl);
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
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.data.success) {
                setCurrentProfilePicture(selectedFile ? URL.createObjectURL(selectedFile) : profilePictureUrl);
                setSelectedFile(null);
                setProfilePictureUrl("");
                setShowImageUpload(false);
                await Swal.fire({
                    title: "Success!",
                    text: "Profile picture updated.",
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
            console.error("Error uploading profile picture:", error);
        }
        setLoadingAddProfile(false);
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setSelectedFile(file);
            setProfilePictureUrl("");
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxFiles: 1,
    });

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (username) {
            fetchPosts();
            fetchFollowsNumber();
        }
    }, [username]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    <ProfileSkeleton/>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="relative">
                        <div
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 relative">
                            <div
                                onClick={() => setShowImageUpload(true)}
                                className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden relative cursor-pointer">
                                <Avatar
                                    src={currentProfilePicture || img_null}
                                    alt="Profile"
                                    className="w-full h-full object-cover"

                                />
                                <div
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black p-1 rounded-full flex items-center justify-center"
                                    onClick={() => setShowImageUpload(true)}
                                >
                                    <Camera className="w-4 h-4 text-white"/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                        <h1 className="text-2xl font-bold mb-1">{fullName ? fullName : username}</h1>
                        <p className="text-sm text-blue-500 mb-2">@{username}</p>
                        <div className="mb-4 max-w-xl text-center md:text-left">
                            <p className="text-sm whitespace-pre-line">{bio}</p>
                        </div>

                        <div className="flex justify-center md:justify-start gap-8 mb-6">
                            <button className="text-center" onClick={() => setActiveTab("posts")}>
                                <div className="font-bold">{posts.length}</div>
                                <div className="text-sm text-gray-500">Posts</div>
                            </button>
                            <button className="text-center" onClick={handleShowFollowing}>
                                <div className="font-bold">{following}</div>
                                <div className="text-sm text-gray-500">Following</div>
                            </button>
                            <button className="text-center" onClick={handleShowFollowers}>
                                <div className="font-bold">{followers}</div>
                                <div className="text-sm text-gray-500">Followers</div>
                            </button>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
                    <TabsList className="grid w-full md:w-auto grid-cols-3 border-b rounded-none bg-transparent h-auto">
                        <TabsTrigger value="posts" >
                            <Grid className="w-4 h-4 mr-2" /> Posts
                        </TabsTrigger>
                        <TabsTrigger value="reels" >
                            <Film className="w-4 h-4 mr-2" /> Reels
                        </TabsTrigger>
                        <TabsTrigger value="tagged">
                            <Tag className="w-4 h-4 mr-2" /> Tagged
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts" className="mt-6">
                        {posts.length > 0 ? (
                            <>
                                <h2 className="font-bold text-xl mb-4">Posts</h2>
                                <PostGrid posts={posts} currentProfilePicture={currentProfilePicture}/>
                            </>
                        ) : (
                            <div className="text-center py-12">
                            <Grid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium">No Posts Yet</h3>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="reels" className="mt-6">
                        <div className="text-center py-12">
                            <Film className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No Reels Yet</h3>
                        </div>
                    </TabsContent>
                    <TabsContent value="tagged" className="mt-6">
                        <div className="text-center py-12">
                            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium">No Tagged Posts</h3>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div {...getRootProps()} className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 cursor-pointer">
                            <input {...getInputProps()} />
                            {selectedFile ? (
                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-32 h-32 rounded-full mb-4" />
                            ) : profilePictureUrl ? (
                                <img src={profilePictureUrl} alt="Preview" className="w-32 h-32 rounded-full mb-4 object-cover" />
                            ) : (
                                <Camera className="w-12 h-12 text-gray-400 mb-4" />
                            )}

                            <p className="text-sm text-gray-500">Click or drag an image</p>
                        </div>
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="w-full border rounded px-2 py-1"
                            value={profilePictureUrl}
                            onChange={(e) => {
                                setProfilePictureUrl(e.target.value);
                                setSelectedFile(null);
                            }}
                        />
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowImageUpload(false)}
                                    className="btn btn-light">
                                <span style={{color: "gray", fontSize: "13px"}}>Cancel</span>
                            </Button>
                            <Button onClick={addProfilePicture} disabled={loadingAddProfile}  className="bg-gray-700 hover:bg-gray-950">
                                <span style={{color: "white", fontSize: "13px"}}>{loadingAddProfile ? 'Saving...' : 'Save'}</span>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {showFollowers && (
                <FollowListComponent title="Followers" list={getAllFollowers} onClose={() => setShowFollowers(false)} />
            )}
            {showFollowing && (
                <FollowListComponent title="Following" list={getAllFollowing} onClose={() => setShowFollowing(false)} />
            )}
        </div>
    );
}