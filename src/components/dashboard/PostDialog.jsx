import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, X } from 'lucide-react';
import { Avatar } from "../ui/Avatar";
import FormatDate from "../../utils/FormatDate";
import { Button } from "../ui/Button";
import img_null from "../../assets/navbar/User_Profile_null.png"

export function PostDialog({ open, onClose, post ,currentProfilePicture}) {
    if (!post) return null;

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden flex flex-col md:flex-row"
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={onClose}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="md:w-2/3 w-full h-full">
                            <img
                                src={post.imageUrl}
                                alt="Post"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="md:w-1/3 w-full p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Avatar src={currentProfilePicture || img_null} className="w-10 h-10 mr-3" />
                                    <div>
                                        <p className="font-semibold">{post.username}</p>
                                        <p className="text-xs text-gray-500">{FormatDate(post.date)}</p>
                                    </div>
                                </div>

                                <p className="text-sm mb-4 whitespace-pre-line">{post.content}</p>

                                <div className="flex items-center gap-6 mb-2">
                                    <div className="flex items-center text-gray-700">
                                        <Heart className="w-5 h-5 mr-2" />
                                        <span>{post.likesCount || 0}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        <span>{post.commentCount || 0}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button variant="outline" className="btn btn-light w-75" onClick={onClose}>
                                    <span style={{color:"gray", fontSize:"13px"}}>Close</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}