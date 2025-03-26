import React, { useEffect, useState } from 'react';
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { RefreshCw } from "lucide-react";
import axios from "axios";
import {TIME_FOLLOW, TIME_SUGGESTION, URL_FOLLOW, URL_GET_SUGGESTED, URL_SERVER_SIDE} from "../../utils/Constants";
import { CircularProgress } from "@mui/material";
import img_null from "../../assets/navbar/User_Profile_null.png"

export default function SuggestedFriends({ currentUsername }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingFollow, setLoadingFollow] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [removingId, setRemovingId] = useState(null);

    function shuffleArray(array) {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }


    const fetchSuggestions = async () => {
        setRefreshing(true);
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_SUGGESTED + `/${currentUsername}`);
            if (response.data.success) {
                const shuffled = shuffleArray(response.data.suggestedFriendsDtos);
                setSuggestions(shuffled);
            } else {
                console.log(response.data.error);
            }
        } catch (e) {
            console.log("Error fetching suggestions. ", e);
        } finally {
            setTimeout(() => setRefreshing(false), TIME_SUGGESTION);
        }
    };

    useEffect(() => {
        if (currentUsername) {
            setLoading(true);
            fetchSuggestions().then(() => setLoading(false));
        }
    }, [currentUsername]);

    const handleFollowToggle = async (username, id) => {
        setLoadingFollow((prev) => ({ ...prev, [username]: true }));
        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_FOLLOW + `/${username}&${currentUsername}`);
            if (response.data.success) {
                setRemovingId(id);
                setTimeout(() => {
                    setSuggestions((prev) => prev.filter(user => user.id !== id));
                    setLoadingFollow((prev) => ({ ...prev, [username]: false }));
                    setRemovingId(null);
                }, TIME_FOLLOW);
            }
        } catch (error) {
            console.error("Error toggling follow state", error);
            setLoadingFollow((prev) => ({ ...prev, [username]: false }));
        }
    };


    return (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h6 className="font-semibold text-gray-900">People You Might Know</h6>
                <RefreshCw
                    className={`w-4 h-4 ${refreshing ? "animate-spin" : "cursor-pointer text-gray-500"}`}
                    onClick={!refreshing ? fetchSuggestions : undefined}
                />
            </div>

            {loading || refreshing ? (
                <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex items-center justify-between animate-pulse">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div className="flex flex-col space-y-1">
                                    <div className="w-24 h-4 bg-gray-200 rounded" />
                                    <div className="w-16 h-3 bg-gray-100 rounded" />
                                </div>
                            </div>
                            <div className="w-16 h-8 bg-gray-200 rounded-md" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {suggestions.slice(0, 4).map((user) => (
                        <div
                            key={user.id}
                            className={`flex items-center justify-between transition-opacity duration-500 ${
                                removingId === user.id ? 'opacity-0' : 'opacity-100'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar src={user.profilePicture || img_null} alt={user.name} className="object-cover" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {user.followedBy ? "Followed By Friends" : "Suggested for you"}
                                    </span>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center"
                                onClick={() => handleFollowToggle(user.name, user.id)}
                                disabled={loadingFollow[user.name]}
                            >
                                {loadingFollow[user.name] ? (
                                    <CircularProgress size={16} color="inherit" />
                                ) : (
                                    "Follow"
                                )}
                            </Button>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
