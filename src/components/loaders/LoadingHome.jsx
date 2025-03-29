import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {FaSpinner} from "react-icons/fa";
import logo from "../../assets/image/iconSocialNetWorkTheOriginalOne.png";

const messages = [
    "Creating your profile...",
    "Encrypting your data...",
    "Setting up your dashboard...",
    "Almost there...",
    "Enjoy!"
];

const TIME_TYPE = 25;
const TIME_DELETE = 700;
const TIME_SHOW = 15;

export default function LoadingHome() {
    const [currentText, setCurrentText] = useState("");
    const [msgIndex, setMsgIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const currentMessage = messages[msgIndex];
        let timeout;


        if (!isDeleting && charIndex <= currentMessage.length) {
            timeout = setTimeout(() => {
                setCurrentText(currentMessage.substring(0, charIndex));
                setCharIndex((prev) => prev + 1);
            }, TIME_TYPE);
        } else if (!isDeleting && charIndex > currentMessage.length) {
            if (msgIndex === messages.length - 1) {
                setIsFinished(true);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, TIME_DELETE);
            }
        } else if (isDeleting && charIndex >= 0) {
            timeout = setTimeout(() => {
                setCurrentText(currentMessage.substring(0, charIndex));
                setCharIndex((prev) => prev - 1);
            }, TIME_SHOW);
        } else if (isDeleting && charIndex < 0) {
            const nextIndex = (msgIndex + 1) % messages.length;
            setMsgIndex(nextIndex);
            setProgress((nextIndex / (messages.length - 1)) * 100);
            setIsDeleting(false);
            setCharIndex(0);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, msgIndex]);

    return (
        <div className="fixed inset-0 z-[9999]">

            <div
                className="absolute inset-0 bg-cover bg-center blur-sm brightness-[0.6]"
                style={{
                    backgroundImage: "url('/skeleton-register-preview.png')",
                }}
            />

            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.6}}
                    className="bg-white/20 border border-white/30 backdrop-blur-xl rounded-3xl px-12 py-12 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] max-w-md w-full space-y-6"
                >

                    <motion.div
                        animate={{scale: [1, 1.1, 1]}}
                        transition={{repeat: Infinity, duration: 2}}>
                        <img src={logo} alt="Logo" className="w-12 h-12 rounded-xl shadow-md"/>
                    </motion.div>


                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold font-sans tracking-tight">
                            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                Social</span>
                            <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                                Network</span>
                        </h2>
                        <div className="w-44 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 rounded-full mx-auto mt-2"/>
                    </div>


                    {!isFinished && (
                        <motion.div
                            className="text-blue-300"
                            animate={{rotate: 360}}
                            transition={{repeat: Infinity, duration: 1.2, ease: "linear"}}
                        >
                            <FaSpinner className="text-4xl"/>
                        </motion.div>
                    )}


                    <div className="h-7 text-lg font-semibold text-center tracking-wide text-white">
                        {currentText}
                        <span className="text-blue-200 animate-pulse">|</span>
                    </div>


                    <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden mt-2">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"
                            animate={{width: `${progress}%`}}
                            transition={{duration: 0.5, ease: "easeOut"}}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
