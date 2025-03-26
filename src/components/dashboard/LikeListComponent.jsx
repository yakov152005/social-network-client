import React from "react";
import img_null from "../../assets/navbar/User_Profile_null.png";
import {NAV_PROFILE, NAV_PROFILE_SEARCH_BASE} from "../../utils/Constants";
import {useNavigate} from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

/**
 * לסדר פה שיהיה אפשר לעשות פולאו מהרשימת לייקים
 * @param likesList
 * @param onClose
 * @param username
 * @returns {Element}
 * @constructor
 */
export default function LikeListComponent({likesList, onClose, username}) {
    const navigate = useNavigate();

    const handleUserClick = (usernameSearch) => {
        if (usernameSearch === username) {
            navigate(NAV_PROFILE);
            return;
        }
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-sm mx-auto overflow-visible max-h-full">
                <DialogHeader className="border-b pb-3">
                    <DialogTitle>Likes</DialogTitle>
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>
                <div className="max-h-[400px] overflow-y-auto py-2">
                    {likesList && likesList.length > 0 ? (
                        likesList.map((like) => (
                            <div
                                key={like.id}
                                className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2"
                                onClick={() => handleUserClick(like.username)}
                            >
                                <div className="flex items-center space-x-3">
                                    <Avatar src={like.profilePicture || img_null} alt={like.username}/>
                                    <div>
                                        <p className="font-medium">{like.username}</p>
                                    </div>
                                </div>

                                {like.username !== username && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log(`Follow ${like.username}`);
                                        }}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">No likes yet</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}