import React, { useEffect, useState } from "react";
import UsernameAPI from "../../api/UsernameAPI";
import axios from "axios";
import {
    NAV_MESSAGE, TIME_FOLLOW, TIME_PROFILE,
    URL_FOLLOW,
    URL_GET_PROFILE_SEARCH,
    URL_SERVER_SIDE,
    URL_UNFOLLOW
} from "../../utils/Constants";
import { useNavigate, useParams } from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import ProfileSkeleton from "../../components/loaders/ProfileSkeleton";
import FollowersAPI from "../../api/FollowersAPI";
import {Avatar} from "../../components/ui/Avatar";
import img_null from "../../assets/navbar/User_Profile_null.png";
import {Button} from "../../components/ui/Button";
import {CircularProgress} from "@mui/material";
import {Film, Grid, Tag} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/Tabs";
import PostGrid from "../../components/dashboard/PostGrid";
import FollowListComponent from "../../components/dashboard/FollowListComponent";

export default function ProfileSearch() {
    const { usernameSearch } = useParams();
    const navigate = useNavigate();
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingFollow, setLoadingFollow] = useState(false);

    const [currentUsername, setCurrentUsername] = useState("");

    const [profileData, setProfileData] = useState({
        username: "",
        profilePicture: "",
        bio: "",
        followers: 0,
        following: 0,
        isFollowing: false,
        posts: [],
        fullName: ""
    });
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersList, setFollowersList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");

    const fetchCurrentUser = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setCurrentUsername);
        } catch (error) {
            console.error("Failed to load current user", error);
        }
    };

    const fetchProfileSearch = async (isInitial = false) => {
        if (isInitial) {
            setInitialLoading(true);
        }

        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_PROFILE_SEARCH + `/${currentUsername}&${usernameSearch}`);
            if (response.data.success) {
                const profileDto = response.data.profileDto;
                setProfileData({
                    username: profileDto.username,
                    profilePicture: profileDto.profilePicture,
                    bio: profileDto.bio,
                    followers: profileDto.followers,
                    following: profileDto.following,
                    isFollowing: profileDto.isFollowing,
                    posts: profileDto.posts,
                    fullName: profileDto.fullName
                });
                setIsFollowing(profileDto.isFollowing);
            }else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching profile", error);
        }finally {
            if (isInitial) {
                setTimeout(() => setInitialLoading(false), TIME_PROFILE);
            }
        }
    };

    const fetchFollowersAndFollowing = async () => {
        try {
            const api = new FollowersAPI();
            await api.fetchFollowingAndFollowers(usernameSearch, setFollowersList, setFollowingList);
        } catch (error) {
            console.error("Error fetching followers/following", error);
        }
    };

    const handleFollowToggle = async () => {
        setLoadingFollow(true);
        try {
            if (isFollowing) {
                const response = await axios.delete(URL_SERVER_SIDE + URL_UNFOLLOW + `/${usernameSearch}&${currentUsername}`);
                if (response.data.success) {
                    setIsFollowing(false);
                }
            } else {
                const response = await axios.post(URL_SERVER_SIDE + URL_FOLLOW + `/${usernameSearch}&${currentUsername}`);
                if (response.data.success) {
                    setIsFollowing(true);
                }
            }

            await fetchProfileSearch(false);
        } catch (error) {
            console.error("Error toggling follow state", error);
        }
        setTimeout(() =>
                setLoadingFollow(false),
            TIME_FOLLOW
        )
    };

    const handleSendMessage = () => {
        navigate(NAV_MESSAGE + `?receiver=${profileData.username}`);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (usernameSearch && currentUsername) {
            fetchProfileSearch(true);
        }
    }, [usernameSearch, currentUsername]);

    if (initialLoading) {
        return (
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    <ProfileSkeleton/>
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="bg-[#f7f9fb] min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 relative">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden relative">
                                <Avatar
                                    src={profileData.profilePicture ? profileData.profilePicture : img_null}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                        <h1 className="text-2xl font-bold mb-1">{profileData.fullName || profileData.username ||  "Loading..."}</h1>
                        <p className="text-sm text-blue-500 mb-2">@{profileData.username || "Loading..."}</p>
                        <div className="mb-4 max-w-xl text-center md:text-left">
                            <p className="text-sm whitespace-pre-line">{profileData.bio}</p>
                        </div>

                        <div className="flex justify-center md:justify-start gap-4 mb-6">
                            <Button onClick={handleFollowToggle} disabled={loadingFollow} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1">
                                {loadingFollow ?  <CircularProgress size={16} color="inherit"/> : isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                            <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1">
                                Message
                            </Button>
                        </div>

                        <div className="flex justify-center md:justify-start gap-8 mb-6">
                            <button className="text-center" onClick={() => setActiveTab("posts")}>
                                <div className="font-bold">{profileData.posts.length}</div>
                                <div className="text-sm text-gray-500">Posts</div>
                            </button>
                            <button className="text-center" onClick={() => {fetchFollowersAndFollowing(); setShowFollowing(true);}}>
                                <div className="font-bold">{profileData.following}</div>
                                <div className="text-sm text-gray-500">Following</div>
                            </button>
                            <button className="text-center" onClick={() => {fetchFollowersAndFollowing(); setShowFollowers(true);}}>
                                <div className="font-bold">{profileData.followers}</div>
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
                        {profileData.posts.length > 0 ? (
                            <>
                                <h2 className="font-bold text-xl mb-4">Posts</h2>
                                <PostGrid posts={profileData.posts} currentProfilePicture={profileData.profilePicture}/>
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

            {showFollowers && (
                <FollowListComponent title="Followers" list={followersList} onClose={() => setShowFollowers(false)} />
            )}
            {showFollowing && (
                <FollowListComponent title="Following" list={followingList} onClose={() => setShowFollowing(false)} />
            )}
        </div>
    );
}

