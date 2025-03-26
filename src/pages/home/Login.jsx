import React, {useState} from "react";
import axios from "axios";
import {
    MAIL_SERVICE,
    MAILTO,
    NAV_CREATE_ACCOUNT,
    NAV_FORGET_PASSWORD,
    TIME_LOADING,
    URL_LOGIN_USER,
    URL_SERVER_SIDE,
    URL_VERIFY
} from "../../utils/Constants";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import logo from '../../assets/image/iconSocialNetWorkTheOriginalOne.png';
import showPass from "../../assets/form/show_password.png"
import hidePass from "../../assets/form/hide_password.png"
import Swal from "sweetalert2";
import "../../styles/PopupStyle.css"
import LoadingOverlay from "../../components/loaders/LoadingOverlay";
import { motion } from "framer-motion";
import { IconUser, IconLock, IconLockPassword } from "@tabler/icons-react";

export default function Login({onLogin}) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isVerification, setIsVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loadingVerification, setLoadingVerification] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormData({...formData, [id]: value});
    };

    const handleVerificationChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState)
    };

    const loginUser = async () => {
        if (!formData.username || !formData.password) {
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

        setLoadingLogin(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_LOGIN_USER, {
                username: formData.username,
                password: formData.password,
            });

            if (response.data.success) {
                if (!response.data.result) {

                    setTimeout(() => {
                        setLoadingLogin(false);
                        setIsVerification(true);
                        setErrorMessage(response.data.error);
                        console.log(response.data.error);
                    }, TIME_LOADING);
                } else if (response.data.result) {
                    setLoadingLogin(false);
                    setLoadingVerification(true);
                    cookies.set("token", response.data.result.token, {path: "/"});
                    console.log("Token:", response.data.result.token);


                    setTimeout(() => {
                        Swal.fire({
                            title: "Verified!!",
                            text: "Success to login.",
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
                        setLoadingVerification(false);
                        onLogin();
                    }, TIME_LOADING);
                }
            } else {
                setErrorMessage(response.data.error);
                setLoadingLogin(false);
            }
        } catch (error) {
            console.error("Error logging in user", error);
            setErrorMessage("Error logging in user");
            setLoadingLogin(false);
        }
    };

    const verifyCode = async () => {
        if (!verificationCode) {
            //setErrorMessage("Please enter the verification code.");
            await Swal.fire({
                title: "Error",
                text: "Please enter the verification code.",
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

        setLoadingVerification(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_VERIFY, {
                username: formData.username,
                code: verificationCode,
            });
            //, maxAge: 3600

            if (response.data && response.data.token) {
                cookies.set("token", response.data.token, {path: "/"});
                console.log("Token:", response.data.token);


                setTimeout(() => {
                    Swal.fire({
                        title: "Verified!!",
                        text: "Success to login.",
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
                    setLoadingVerification(false);
                    onLogin();
                }, TIME_LOADING);

            } else {
                setErrorMessage("Invalid verification code.");
                console.log("Token not found")
                setLoadingVerification(false);
            }
        } catch (error) {
            console.error("Error verifying code", error);
            setErrorMessage("Failed to verify code. Please try again later.");
            setLoadingVerification(false);
        }
    };



    return (
        <div
            className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col md:flex-row items-center justify-center p-4">


            {loadingVerification && <LoadingOverlay text="Verification successful! Wait a few moments..."/>}

            {loadingLogin && <LoadingOverlay text="SMS sent with verification code! Wait a few moments..."/>}


            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
            >
                <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg sm:shadow-xl login-card">
                        {!loadingVerification && !loadingLogin && (
                            <>
                                {!isVerification ? (
                                    <>
                                        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Login</h2>
                                        <p className="text-gray-600 text-center mb-6">Welcome back! Please login to
                                            continue</p>


                                        <div className="relative mb-4">
                                            <input
                                                type="text"
                                                id="username"
                                                placeholder="Username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <div
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <IconUser stroke={1.5}/>
                                            </div>
                                        </div>


                                        <div className="relative mb-2">
                                            <input
                                                type={!showPassword ? "password" : "text"}
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <div
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <IconLock stroke={1.5}/>
                                            </div>
                                            {formData.password.length > 0 && (
                                                <img
                                                    src={!showPassword ? showPass : hidePass}
                                                    alt="Toggle Password"
                                                    onClick={handleShowPassword}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-5 h-5"
                                                />
                                            )}
                                        </div>


                                        <div className="flex justify-end mb-4 text-sm">
                                            <motion.button
                                                whileHover={{scale: 1.05}}
                                                onClick={() => navigate(NAV_FORGET_PASSWORD)}
                                                className="relative group text-blue-500 font-medium"
                                            >
                                            <span
                                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                                                Forgot password?
                                            </span>
                                                <span
                                                    className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 transition-transform duration-300 origin-left group-hover:scale-x-100"
                                                ></span>
                                            </motion.button>
                                        </div>


                                        {errorMessage && (
                                            <div
                                                className="bg-red-50 text-red-600 p-2 rounded-lg text-center text-sm mb-4">
                                                <strong>{errorMessage}</strong>
                                            </div>
                                        )}


                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                            onClick={loginUser}
                                            className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md transition text-center"
                                        >
                                            <span className="relative z-10">Login</span>
                                            <span
                                                className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                                        </motion.button>


                                        <div className="flex items-center my-6">
                                            <div className="flex-grow border-t border-gray-300"></div>
                                            <span className="mx-2 text-gray-400">or</span>
                                            <div className="flex-grow border-t border-gray-300"></div>
                                        </div>


                                        <div className="flex justify-center mt-4 group relative w-full">
                                            <motion.button
                                                whileHover={{scale: 1.05}}
                                                onClick={() => navigate(NAV_CREATE_ACCOUNT)}
                                                className="text-blue-500 font-medium relative z-10"
                                            >
                                                <span className="text-gray-600"> New to Social-Network? </span>
                                                <span
                                                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">Sign Up</span>
                                            </motion.button>
                                            <span
                                                className="absolute bottom-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 transition-transform duration-300 origin-left group-hover:scale-x-100">
                                        </span>
                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Verification</h2>
                                        <p className="text-gray-600 text-center mb-6">Enter the verification code sent
                                            to
                                            your phone</p>

                                        <div className="relative mb-4">
                                            <input
                                                type="text"
                                                value={verificationCode}
                                                onChange={handleVerificationChange}
                                                placeholder="Verification Code"
                                                className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <div
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <IconLockPassword stroke={1.5}/>
                                            </div>
                                        </div>

                                        {errorMessage && (
                                            <div className="bg-red-50 text-red-600 p-2 rounded-lg text-center text-sm">
                                                <strong>{errorMessage}</strong>
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                            onClick={verifyCode}
                                            className="relative overflow-hidden w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md transition text-center"
                                        >
                                            <span className="relative z-10">Verify Code</span>
                                            <span
                                                className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                                        </motion.button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
            </motion.div>


            <motion.div
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1}}
                className="w-full md:w-1/2 flex flex-col items-center space-y-6 px-4"
            >

                {!isVerification ? (
                    <>
                        <img src={logo} alt="Logo" className="w-32 h-32 "/>
                        <motion.h2
                            initial={{opacity: 0, y: -30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            className="text-center text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
                        >
                            Welcome Back!
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: -30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            className="text-center text-sm md:text-lg font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
                        >
                            Join a vibrant community and start creating unforgettable experiences.
                        </motion.p>

                        <div className="space-y-4 w-full max-w-sm">
                            <FeatureBox icon="bi-people" text="Connect with friends & new people"/>
                            <FeatureBox icon="bi-chat" text="Engage in meaningful conversations"/>
                            <FeatureBox icon="bi-images" text="Share moments, photos, and stories"/>
                            <FeatureBox icon="bi-heart"
                                        text="Follow friends, comment and like them on experiences they share"/>
                        </div>
                    </>
                ) : (
                    <>
                        <IconLockPassword stroke={1} size={150} color={"#5d77e6"}/>
                        <motion.h2
                            initial={{opacity: 0, y: -30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            className="text-center text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg"
                        >
                            Secure Authentication
                        </motion.h2>
                        <p className="text-gray-600 text-center mb-4 max-w-md">
                            For your safety, please complete the verification process.
                        </p>
                        <div className="space-y-4 w-full max-w-sm">
                            <FeatureBox icon="fas fa-sms" text="You'll receive an SMS with a verification code."/>
                            <FeatureBox icon="fas fa-clock" text="This process may take up to 2 minutes."/>
                            <FeatureBox icon="fas fa-key" text="Enter the code as soon as you receive it."/>
                            <FeatureBox icon="fas fa-shield-alt" text="Your security is our top priority."/>
                        </div>

                        <div className="flex justify-end mb-4 text-sm">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                href={MAILTO + MAIL_SERVICE}
                                className="relative group text-blue-500 font-medium"
                            >
                                <span className="text-sm mt-4 text-gray-500 mr-1">
                                    Need help?
                                </span>
                                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
                                    Contact Support
                                </span>
                                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                            </motion.button>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}

function FeatureBox({icon, text}) {
    return (
        <motion.div whileHover={{scale: 1.05}}
                    className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-lg shadow-md">
            <div className="text-blue-500 bg-white p-3 rounded-full shadow-md">
                <i className={`${icon}`} style={{fontSize: "1.2rem"}}></i>
            </div>
            <div>
                <p className="font-semibold text-gray-600" style={{fontSize: "16px"}}>{text}</p>
            </div>
        </motion.div>
    );
}