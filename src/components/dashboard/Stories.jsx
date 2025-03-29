import React, { useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from "../ui/ScrollArea";
import { Avatar } from "../ui/Avatar";
import { Dialog } from "../ui/Dialog";
import { motion, AnimatePresence } from "framer-motion";
import {AlertTriangleIcon, Camera, ChevronLeft, ChevronRight, Heart, Image, MessageCircle, Send, X} from 'lucide-react';
import axios from 'axios';
import {TIME_STORIES, URL_ADD_STORIES, URL_GET_ALL_STORIES, URL_SERVER_SIDE} from "../../utils/Constants";
import FormatDate from "../../utils/FormatDate";
import img_null from "../../assets/navbar/User_Profile_null.png"

export default function Stories({ username }) {
    const [stories, setStories] = useState([]);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchStories = async () => {
        try {
            const res = await axios.get(URL_SERVER_SIDE + URL_GET_ALL_STORIES + `/${username}`);
            if (res.data.success) {
                setStories(res.data.storiesDtos);
            }
        } catch (error) {
            console.error("Failed to fetch stories:", error);
        }
    };

    useEffect(() => {
        if (username) fetchStories();
    }, [username]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImageUrl("");
    };

    const handleUpload = async () => {
        if (!file && !imageUrl) return;
        const formData = new FormData();
        formData.append("username", username);
        if (file) formData.append("postImageFile", file);
        if (imageUrl) formData.append("postImageUrl", imageUrl);

        try {
            setLoading(true);
           const response = await axios.post(URL_SERVER_SIDE + URL_ADD_STORIES, formData);
           if (response.data.success){
               setUploadOpen(false);
               setFile(null);
               setImageUrl("");
               setErrorMessage("");
               fetchStories();
           }else {
               setLoading(false);
               setShowAlert(false);
               setTimeout(() => {
                   setErrorMessage(response.data.error);
                   setShowAlert(true);
               }, 50);
           }
        } catch (error) {
            setLoading(false);
            setShowAlert(false);
            setTimeout(() => {
                setErrorMessage("Error uploading story:", error);
                setShowAlert(true);
            }, 50);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const openPreview = (index) => {
        setSelectedIndex(index);
        setSelectedImage(stories[index]);
        setPreviewOpen(true);
    };

    const nextStory = () => {
        const next = (selectedIndex + 1) % stories.length;
        setSelectedIndex(next);
        setSelectedImage(stories[next]);
    };

    const prevStory = () => {
        const prev = (selectedIndex - 1 + stories.length) % stories.length;
        setSelectedIndex(prev);
        setSelectedImage(stories[prev]);
    };

    useEffect(() => {
        if (previewOpen) {
            const timer = setTimeout(() => {
                if (stories.length > 1) {
                    const next = (selectedIndex + 1) % stories.length;
                    setSelectedIndex(next);
                    setSelectedImage(stories[next]);
                }
            }, TIME_STORIES);


            return () => clearTimeout(timer);
        }
    }, [selectedIndex, previewOpen]);

    return (
        <div className="rounded-xl p-4 mb-4">
            <h3 className="font-semibold mb-4 text-gray-900">Stories</h3>
            <ScrollArea className="w-full overflow-x-auto pb-2">
                <div className="flex space-x-4 px-2 mt-2">
                    <motion.div
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                        className="flex flex-col items-center space-y-2 cursor-pointer"
                        onClick={() => setUploadOpen(true)}
                    >
                        <div
                            className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-300 to-gray-100 flex items-center justify-center shadow-inner">
                            <Camera className="w-6 h-6 text-gray-700"/>
                        </div>
                        <span className="text-xs text-gray-600">Add Story</span>
                    </motion.div>

                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            onClick={() => openPreview(index)}
                            initial={{opacity: 0, scale: 0.9}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: false, amount: 0.3}}
                            transition={{duration: 0.4, delay: index * 0.05}}
                            className="flex flex-col items-center space-y-2 cursor-pointer"
                        >
                            <div
                                className="relative w-16 h-16 rounded-full ring-2 ring-pink-500 ring-offset-2 overflow-hidden">
                                <Avatar
                                    className="w-full h-full rounded-full object-cover"
                                    src={story.profilePicture || img_null}
                                    alt={story.username}
                                />
                            </div>
                            <span className="text-xs text-gray-600">{story.username}</span>
                        </motion.div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)}>
                <div
                    className="p-6 w-full max-w-md bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-2xl space-y-5 animate-fade-in">
                    <h2 className="text-2xl font-extrabold text-gray-800 text-center">📸 Upload Your Story</h2>
                    <p className="text-sm text-gray-500 text-center italic">
                        Note: Story will disappear after at least 24 hours.
                    </p>

                    <div className="relative">
                        <Camera className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60"/>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-full text-sm border border-gray-300 pl-10 p-2 rounded-md shadow-sm  file:ml-5 file:cursor-pointer file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded file:py-2 file:px-4 file:text-sm file:font-semibold hover:file:bg-blue-100"
                            title="Choose image file"
                        />
                    </div>

                    <div className="relative">
                        <Image className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60"/>
                        <input
                            type="text"
                            placeholder="or paste image URL..."
                            value={imageUrl}
                            onChange={(e) => {
                                setImageUrl(e.target.value);
                                setFile(null);
                            }}
                            className="w-full py-3 pl-12 pr-4 rounded-md text-sm shadow-md border border-gray-300 focus:outline-gray-300"
                        />
                    </div>

                    {(file || imageUrl) && (
                        <div className="mt-2 rounded-md overflow-hidden border">
                            <img
                                src={file ? URL.createObjectURL(file) : imageUrl}
                                alt="preview"
                                className="w-full h-auto max-h-64 object-contain rounded-md"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center gap-4 pt-2">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={() => setUploadOpen(false)}
                            className="relative overflow-hidden w-full md:w-1/2 bg-gradient-to-r from-gray-200 to-gray-100 hover:bg-gray-300 gray-700 py-3 shadow-md transition text-center rounded"
                        >
                            <span className="relative z-10">
                                Cancel
                            </span>
                            <span
                                className="absolute top-0 left-[-95%] w-full h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                        </motion.button>

                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={handleUpload}
                            disabled={loading}
                            className="relative overflow-hidden w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 shadow-md transition text-center rounded"
                        >
                            <span className="relative z-10">
                                {loading ? "Uploading..." : "Upload Story"}
                            </span>
                            <span
                                className="absolute top-0 left-[-95%] w-full h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                        </motion.button>
                    </div>

                    {showAlert && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="mt-6 p-3 rounded bg-red-100 text-red-700 flex items-center justify-center"
                        >
                            <AlertTriangleIcon className="w-5 h-5 text-yellow-500 mr-2"/>
                            {errorMessage}
                        </motion.div>
                    )}
                </div>
            </Dialog>


            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="relative w-full max-w-sm sm:max-w-3xl h-[85dvh] bg-black flex flex-col justify-between rounded-none sm:rounded-xl overflow-hidden">

                                {/* 🟦 Progress Bar */}
                                {/* 🟦 Colorful Progress Bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-20">
                                    <motion.div
                                        key={selectedIndex}
                                        className="h-full bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 5, ease: "linear" }}
                                    />
                                </div>


                                {/* 🧑‍ Top Bar */}
                                <div className="flex items-center justify-between px-4 py-2 bg-black bg-opacity-70 z-10">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <Avatar
                                            src={selectedImage.profilePicture || img_null}
                                            className="w-8 h-8 rounded-full shrink-0"
                                        />
                                        <span className="text-white text-sm font-semibold truncate">{selectedImage.username}</span>
                                        <span className="text-gray-400 text-xs whitespace-nowrap">{FormatDate(selectedImage.date)}</span>
                                    </div>
                                    <button
                                        onClick={() => setPreviewOpen(false)}
                                        className="p-2 bg-white rounded-full hover:bg-gray-200 shadow"
                                    >
                                        <X className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>

                                {/* 🖼️ Image */}
                                <div className="flex-grow flex items-center justify-center overflow-hidden px-1 py-1">
                                    <img
                                        src={selectedImage.imageStories}
                                        alt="story"
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>

                                {/* ❤️💬 Bottom Bar */}
                                <div className="px-4 pt-3 pb-4 bg-black bg-opacity-70 border-t border-gray-800">
                                    <div className="flex items-center gap-4 mb-3">
                                        <button className="text-white hover:scale-110 transition">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                        <button className="text-white hover:scale-110 transition">
                                            <MessageCircle className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 bg-gray-800/30 rounded-full px-4 py-2">
                                        <input
                                            type="text"
                                            placeholder="Reply to this story..."
                                            className="bg-transparent text-sm text-white flex-1 outline-none placeholder-gray-400"
                                        />
                                        <Send className="w-4 h-4 text-white cursor-pointer" />
                                    </div>
                                </div>

                                {/* 🔁 Navigation Arrows */}
                                {stories.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevStory}
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-200 shadow"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={nextStory}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-200 shadow"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Dialog>

        </div>
    );
}