import React, {useEffect, useState} from "react";
import axios from "axios";
import {Avatar} from "../ui/Avatar";
import {Badge} from "../ui/Badge";
import {URL_DISCONNECT_ONLINE, URL_LIST, URL_SERVER_SIDE, URL_SSE_ONLINE} from "../../utils/Constants";
import img_null from "../../assets/navbar/User_Profile_null.png";

export default function OnlineFriends({username}) {
    const [onlineFriends, setOnlineFriends] = useState([]);


    useEffect(() => {
        if (!username) return;

        axios.get(URL_SERVER_SIDE + URL_LIST + `/${username}`)
            .then(response => {
                if (response.data.success) {
                    const unique = [...new Map(response.data.onlineFriendsDtos.map(friend => [friend.username, friend])).values()];
                    setOnlineFriends(unique);
                }
            })
            .catch(error => {
                console.error("Failed to load online friends:", error);
            });

        const eventSource = new EventSource(URL_SERVER_SIDE + URL_SSE_ONLINE + `/${username}`);

        eventSource.addEventListener("FRIEND_STATUS", (event) => {
            const data = JSON.parse(event.data);
            const { userId, username, profilePicture, online } = data;

            setOnlineFriends(prev => {
                const exists = prev.find(friend => friend.id === userId || friend.username === username);

                if (online && !exists) {
                    return [...prev, { id: userId, username, profilePicture }];
                } else if (!online && exists) {
                    return prev.filter(friend => !(friend.id === userId || friend.username === username));
                }
                return prev;
            });
        });


        eventSource.onerror = () => {
            console.warn("SSE connection lost.");
            eventSource.close();
        };

        return () => {
            axios.get(URL_SERVER_SIDE + URL_DISCONNECT_ONLINE + `/${username}`)
                .catch(err => console.error("Error disconnecting", err));
            eventSource.close();
        };
    }, [username]);


    return (
        <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <h6 className="font-semibold text-gray-900">Online Friends</h6>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {onlineFriends.length} Online
                </Badge>
            </div>
            <div className="space-y-4">
                {onlineFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-3">
                        <div className="relative">
                            <Avatar src={friend.profilePicture || img_null} alt={friend.username} className="object-cover"/>
                            <span
                                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <span className="text-sm font-medium">{friend.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
