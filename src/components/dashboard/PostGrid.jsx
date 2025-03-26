import React, { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import "../../styles/components/PostGridStyle.css"
import {PostDialog} from "./PostDialog";

export default function PostGrid({ posts,currentProfilePicture }) {
    const [selectedPost, setSelectedPost] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setSelectedPost(null);
        setOpenDialog(false);
    };

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="aspect-square relative cursor-pointer overflow-hidden bg-gray-100 custom-post"
                        onClick={() => handlePostClick(post)}
                    >
                        <img
                            src={post.imageUrl || null}
                            alt="Post"
                            className="h-full w-full object-cover transition-transform duration-200"
                        />

                        <div
                            className="absolute inset-0 bg-black bg-opacity-25 opacity-0 transition-opacity flex items-center justify-center">
                            <div className="flex gap-6 text-white font-semibold">
                                <div className="flex items-center">
                                    <Heart className="mr-2 h-6 w-6 fill-white text-white"/>
                                    <span>{post.likesCount || 0}</span>
                                </div>
                                <div className="flex items-center">
                                    <MessageSquare className="mr-2 h-6 w-6"/>
                                    <span>{post.commentCount || 0}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>


            {selectedPost && (
                <PostDialog open={openDialog} onClose={handleClose} post={selectedPost} currentProfilePicture={currentProfilePicture}/>

            )}

        </div>
    );
}
