import img_null from "../../assets/navbar/User_Profile_null.png";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {NAV_PROFILE, NAV_PROFILE_SEARCH_BASE} from "../../utils/Constants";
import UsernameAPI from "../../api/UsernameAPI";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

export default function FollowListComponent({ title, list, onClose }) {
    const [username,setUsername] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();


    const fetchDetails = async () => {
        try {
            const api = new UsernameAPI();
            await api.fetchUserDetails(setUsername);
        }catch (error){
            console.log("Error to fetching user details.",error);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleUserClick = (usernameSearch) => {
        if (usernameSearch === username){
            navigate(NAV_PROFILE);
            return;
        }
        onClose();
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };

    const filteredList = list.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-sm mx-auto overflow-visible max-h-full">
            <DialogHeader className="border-b pb-3">
                    <DialogTitle>{title}</DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>


                <div className="py-3">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>


                <div className="max-h-[400px] overflow-y-auto py-2">
                    {filteredList.length > 0 ? (
                        filteredList.map((profile, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2"
                                onClick={() => handleUserClick(profile.username)}
                            >
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        src={profile.profilePicture || img_null}
                                        alt={profile.username}
                                    />
                                    <div>
                                        <p className="font-medium">{profile.username}</p>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Following
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No users found</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}