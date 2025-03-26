import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV_LOGIN} from "../../utils/Constants";

export default function WelcomeScreen({ setShowIntro }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -50}}
            transition={{duration: 0.6}}
            className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg text-center"
        >

            <div className="relative text-center mb-6">
                <p className="text-4xl font-bold text-center  text-gray-600">
                    Welcome to
                </p>
                <h2 className="text-4xl font-bold mb-4 inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent relative z-10">
                    SocialNetwork
                </h2>

                <div
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-64 h-1 bg-blue-200 rounded-md z-0"></div>
            </div>

            <p className="text-gray-500 mb-8">
                Connect, share, and explore amazing content with people worldwide. Join now and be part of something
                big!
            </p>

            <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={() => setShowIntro(false)}
                className="relative overflow-hidden w-40 bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 shadow-md transition text-center rounded"
            >
                <span className="relative z-10">Join Now</span>
                <span
                    className="absolute top-0 left-[-75%] w-[90%] h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
            </motion.button>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>


            <div className="flex justify-center mt-4 group relative w-full">
                <motion.button
                    whileHover={{scale: 1.05}}
                    onClick={() => navigate(NAV_LOGIN)}
                    className="text-blue-500 font-medium relative z-10"
                >
                    <span className="text-gray-600">Already have an account? </span>
                    <span
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">Sign In</span>
                </motion.button>
                <span
                    className="absolute bottom-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 transition-transform duration-300 origin-left group-hover:scale-x-100">
                </span>
            </div>
        </motion.div>
    );
}
