import React, {useState} from "react";
import axios from "axios";
import {
    NAV_LOGIN,
    URL_RESET_PASSWORD,
    URL_SERVER_SIDE
} from "../../utils/Constants";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {IconKey, IconLock, IconMailFilled, IconUser} from "@tabler/icons-react";
import "../../styles/PopupStyle.css"
import LoadingOverlay from "../../components/loaders/LoadingOverlay";
import {motion} from "framer-motion";

export default function ForgetPassword() {
    const [username, setUserName] = useState("");
    const [emailForReset, setEmailForReset] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleClick = async () => {
        if (!username || !emailForReset){
            await Swal.fire({
                title: "Error",
                text: "Please fill all fields.",
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

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Before you reset your password, make sure you remember your email password and that you are confident in this process.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5269bc",
            cancelButtonColor: "#b4c2cf",
            confirmButtonText: "Yes, Reset it!",
            cancelButtonText: "Cancel",
            background: "#1a1a2e",
            color: "#ffffff",
            customClass: {
                popup: "swal-custom-popup",
                container: "swal2-container",
                title: "swal-custom-title",
                confirmButton: "swal-custom-confirm",
                cancelButton: "swal-custom-cancel",
            }
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const response = await axios.get(URL_SERVER_SIDE + URL_RESET_PASSWORD + `/${emailForReset}&${username}`);
                if (response.data.success) {
                    Swal.fire({
                       title: "Success!",
                       html: "The new password has been sent to your email... <i class='bi bi-envelope-at'></i>",
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
                    console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
                    setTimeout(() => {
                        setLoading(false);
                        navigate(NAV_LOGIN);
                    }, 50);
                } else {
                    //Swal.fire("Error", response.data.error, "error");
                    setErrorMessage(response.data.error);
                    console.log(`{success: ${response.data.success}, error:{ ${response.data.error} }}`);
                    setUserName("");
                    setEmailForReset("");
                    setLoading(false);
                }
            } catch (error) {
                 Swal.fire("Error", "Failed to reset password.", "error");
                setErrorMessage("Failed to reset password.");
                console.error("Error get request Email", error);
                setLoading(false);
            }
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col md:flex-row items-center justify-center p-4">


            {loading && <LoadingOverlay text="Sending you a link to your email, please wait..." />}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
            >
                <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg sm:shadow-xl login-card">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Reset Password</h2>
                    <p className="text-gray-600 text-center mb-6">Enter your username and email to reset your
                        password.</p>

                    <div className="relative mb-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <IconUser stroke={1.5}/>
                        </div>
                    </div>

                    <div className="relative mb-4">
                        <input
                            type="email"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <IconMailFilled stroke={1.5}/>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-50 text-red-600 p-2 rounded-lg text-center text-sm mb-4">
                            <strong>{errorMessage}</strong>
                        </div>
                    )}

                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={handleClick}
                        disabled={loading}
                        className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md transition text-center"
                    >
                        <span className="relative z-10"> {loading ? 'Processing...' : 'Send Reset Link'}</span>

                        <span
                            className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                    </motion.button>


                    <div className="flex justify-center mt-4 group relative w-full">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            onClick={() => navigate(NAV_LOGIN)}
                            className="text-blue-500 font-medium relative z-10"
                        >
                            <span className="text-gray-600">Remember your password? </span>
                            <span
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent"> Sign in.</span>
                        </motion.button>
                        <span
                            className="absolute bottom-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 transition-transform duration-300 origin-left group-hover:scale-x-100">

                        </span>
                    </div>
                </div>
            </motion.div>


            <motion.div
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                className="w-full md:w-1/2 flex flex-col items-center space-y-6 px-4"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">🔐 Trouble Logging In?</h2>
                <p className="text-gray-600 text-center mb-4 max-w-md"> No worries! Enter
                    your <strong>username</strong> and <strong>email address</strong>,
                    <p>and we'll send you instructions to <strong>reset your password</strong>
                        <p> and get back to your account in no time.</p></p></p>


                <div className="space-y-4 w-full max-w-sm">
                    {[
                        {
                            title: 'Email Recovery',
                            desc: 'Receive a recovery link in your inbox.',
                            icon: <IconMailFilled stroke={1.5}/>
                        },
                        {
                            title: 'Secure Reset',
                            desc: 'Check your inbox for reset instructions.',
                            icon: <IconKey stroke={1.5}/>
                        },
                        {
                            title: 'Instant Access',
                            desc: 'Receive a new password and change it after login.',
                            icon: <IconLock stroke={1.5}/>
                        }
                    ].map((box, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-md"
                        >
                            <div className="text-blue-500 bg-white p-3 rounded-full shadow-md">
                                {box.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-1">{box.title}</h4>
                                <p className="text-gray-600 text-sm">{box.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}