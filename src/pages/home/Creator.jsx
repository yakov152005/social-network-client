import { useEffect, useState } from "react";
import {
    MAIL_SERVICE,
    MAILTO,
    NAV_LOGIN,
    URL_GET_NUM_OF_USERS,
    URL_SERVER_SIDE,
    URL_SSE_DATE
} from "../../utils/Constants";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import lol from "../../assets/gif/lol.mp4"
import {FaEnvelope, FaWhatsapp} from "react-icons/fa";
export default function Creator() {
    const [message, setMessage] = useState("");
    const [numOfUsersRegisters, setNumOfUsersRegisters] = useState("");
    const navigate = useNavigate();

    const fetchNumOfUsers = async () => {
        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_GET_NUM_OF_USERS);
            if (response.data.success) {
                setNumOfUsersRegisters(response.data.error);
            }
        } catch (error) {
            console.log("Error fetching users", error);
        }
    };

    useEffect(() => {
        fetchNumOfUsers();
    }, []);

    useEffect(() => {
        const sse = new EventSource(URL_SSE_DATE);
        sse.addEventListener("message", (event) => {
            setMessage(event.data);
        });
        return () => {
            sse.close();
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={lol} type="video/mp4" />
            </video>


            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-black/70 z-10"></div>


            <div className="relative z-20 p-6 flex flex-col space-y-10 items-center w-full">


                <motion.h1
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                    className="text-center text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
                >
                    Developed by Yakov Ben Hemo Ⓒ
                </motion.h1>


                <div className="flex flex-col space-y-6 w-full max-w-md">


                    <motion.div
                        whileHover={{scale: 1.05}}
                        className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-6 text-center border border-purple-500"
                    >
                        <p className="text-lg font-semibold text-white">{message}</p>
                    </motion.div>


                    <motion.div
                        whileHover={{scale: 1.05}}
                        className="bg-white/10 backdrop-blur-md shadow-2xl rounded-xl p-6 text-center border border-blue-500"
                    >
                        <p className="text-lg text-white">Registered Users:</p>
                        <p className="text-3xl font-bold mt-2 text-white">{numOfUsersRegisters}</p>
                    </motion.div>


                    <motion.div
                        whileHover={{scale: 1.05}}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1}}
                        className="bg-white/90 text-gray-800 shadow-2xl rounded-xl p-6 text-center flex flex-col items-center border border-gray-300"
                    >
                        <h4 className="text-2xl font-bold mb-3">Contact Us</h4>
                        <p className="mb-4 text-base">Is there any problem?</p>
                        <div className="flex gap-6 text-blue-700 text-3xl">
                            <a href={MAILTO + MAIL_SERVICE} className="hover:text-blue-900">
                                <FaEnvelope/>
                            </a>
                            <a href="https://wa.me/+972526650754" className="hover:text-green-600">
                                <FaWhatsapp/>
                            </a>
                        </div>
                    </motion.div>
                </div>
                <motion.div className="flex items-center justify-center h-14 ">
                    <motion.button
                        onClick={() => navigate(NAV_LOGIN)}
                        className="relative flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-300 shadow-lg overflow-hidden"
                    >
                        <span>Back To Login</span>
                        <motion.span
                            initial={{x: -5}}
                            whileHover={{x: 0}}
                            transition={{type: "spring", stiffness: 300}}
                            className="flex items-center"
                        >
                            <ArrowRight size={20}/>
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
