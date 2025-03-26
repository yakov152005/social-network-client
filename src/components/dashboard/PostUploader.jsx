import React, { useState } from 'react';
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { Textarea } from "../ui/Textarea";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "../ui/Dialog";
import { Camera, Image, Send, X, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from 'framer-motion';
import Swal from "sweetalert2";
import {URL_ADD_POST, URL_SERVER_SIDE} from "../../utils/Constants";
import axios from "axios";
import img_null from "../../assets/navbar/User_Profile_null.png"

export default function PostUploader({ username, profilePicture, refreshPosts }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showUrlDialog, setShowUrlDialog] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const placeholder = `Hi ${username}, What do you have in mind?`;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setImageUrl('');
        }
    };

    const handleSubmit = async () => {
        if (!image && !imageUrl) {
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

        setLoading(true);

        let formData = new FormData();
        formData.append("username", username);
        formData.append("content", content);

        if (image) {
            formData.append("postImageFile", image);
        } else if (imageUrl.startsWith("http")) {
            formData.append("postImageUrl", imageUrl);
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
            setLoading(false);
            return;
        }


        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_POST, formData, {
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

                refreshPosts();


                setContent('');
                setImage(null);
                setPreviewUrl('');
                setImageUrl('');
                setIsDialogOpen(false);
                setShowPicker(false);
                setShowUrlDialog(false);
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
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center space-x-3">
                    <Avatar
                        src={profilePicture || img_null}
                        alt={username || "User"}
                        className="w-10 h-10 object-cover"
                    />
                    <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2 space-x-2">
                        <input
                            type="text"
                            placeholder={placeholder}
                            readOnly
                            onClick={() => setIsDialogOpen(true)}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 cursor-pointer"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition"
                            >
                                <Image className="w-4 h-4 text-blue-600"/>
                            </button>
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition"
                            >
                                <Camera className="w-4 h-4 text-pink-600"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isDialogOpen && (
                    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.9}}
                        >
                            <DialogHeader>
                                <DialogTitle>Create Post</DialogTitle>
                                <button onClick={() => setIsDialogOpen(false)}>
                                    <X className="w-5 h-5"/>
                                </button>
                            </DialogHeader>
                            <DialogContent>
                                <div className="space-y-4">
                                    <Textarea
                                        placeholder={placeholder}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full min-h-[100px] resize-none"
                                    />

                                    {previewUrl && (
                                        <motion.div
                                            className="relative"
                                            initial={{opacity: 0, scale: 0.95}}
                                            animate={{opacity: 1, scale: 1}}
                                        >
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full max-h-[300px] object-contain rounded-lg"
                                            />
                                            <button
                                                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full"
                                                onClick={() => {
                                                    setImage(null);
                                                    setPreviewUrl('');
                                                }}
                                            >
                                                <X className="w-4 h-4"/>
                                            </button>
                                        </motion.div>
                                    )}

                                    {showUrlDialog &&
                                        <input
                                            type="text"
                                            placeholder="Or paste image URL..."
                                            value={imageUrl}
                                            onChange={(e) => {
                                                setImageUrl(e.target.value);
                                                setImage(null);
                                                setPreviewUrl(e.target.value);
                                            }}
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    }

                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="bg-gradient-to-tr from-amber-700 to-amber-400"
                                                onClick={() => document.getElementById('imageUpload').click()}
                                            >
                                            <Image className="w-5 h-5"/>
                                            </Button>
                                            <input
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-purple-600"
                                                onClick={() => {setShowUrlDialog(!showUrlDialog)}}
                                            >
                                                <Camera className="w-5 h-5"/>
                                            </Button>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                                                onClick={() => setShowPicker(!showPicker)}
                                            >
                                                <Smile className="w-5 h-5 text-yellow-500"/>
                                            </button>
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700"
                                                onClick={handleSubmit}
                                                disabled={(!previewUrl && !imageUrl) || loading}
                                            >
                                                {loading ? "Processing...⌛" : <Send className="w-4 h-4"/>}
                                            </Button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {showPicker && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-2"
                                            >
                                                <EmojiPicker
                                                    onEmojiClick={(emoji) => {
                                                        setContent((prev) => prev + emoji.emoji);
                                                        setShowPicker(false);
                                                    }}
                                                    width="100%"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </DialogContent>
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
}
