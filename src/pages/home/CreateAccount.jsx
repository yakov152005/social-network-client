import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Checkbox } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router-dom";
import TermsAgreement from "../../components/home/TermsAgreement";
import LoadingOverlay from "../../components/loaders/LoadingOverlay";
import {
    NAV_LOGIN,
    URL_CREATE_USER,
    URL_SERVER_SIDE,
    TIME_LOADING,
} from "../../utils/Constants";
import {UserIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/16/solid";
import {AlertTriangleIcon, CheckIcon, EyeIcon, EyeOffIcon, MailIcon, PhoneIcon} from "lucide-react";
import {IconLockCheck} from "@tabler/icons-react";
import {FaBirthdayCake} from "react-icons/fa";
import WelcomeScreen from "../../components/home/WelcomeScreen";

const steps = [
    { title: "Account" },
    { title: "Password" },
    { title: "Confirm" },
];

export default function CreateAccount() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [confirmRadio, setConfirmRadio] = useState(false);
    const [confirmTwoFactor, setConfirmTwoFactor] = useState(false);
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [showIntro, setShowIntro] = useState(true);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
        email: "",
        fullName: "",
        age: 0,
        twoFactor: "disabled",
    });

    const [validation, setValidation] = useState({
        username: false,
        password: false,
        passwordConfirm: false,
        phoneNumber: false,
        email: false,
        age: false,
    });

    useEffect(() => {
        if (errorMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });

        switch (id) {
            case "username":{
                setValidation((prev) => ({ ...prev, username: value.length >= 2 }));
                break;
            }
            case "password": {
                const hasSpecialChar = /[!@#$%^&*()-+=_]/.test(value);
                const letterUpper = /[A-Z]/.test(value);
                const letterLower = /[a-z]/.test(value);
                const numbers = /[0-9]/.test(value);

                setValidation((prev) => ({
                    ...prev,
                    password:
                        value.length >= 8 &&
                        (letterLower || letterUpper) &&
                        hasSpecialChar &&
                        numbers,
                }));
                break;
            }
            case "passwordConfirm":{
                setValidation((prev) => ({
                    ...prev,
                    passwordConfirm: value === formData.password,
                }));
                break;
            }
            case "phoneNumber":{
                const isValidPhone = value.startsWith("05") && value.length === 10;
                setValidation((prev) => ({ ...prev, phoneNumber: isValidPhone }));
                break;
            }
            case "email":{
                const validDomains = [
                    "@walla.co.il",
                    "@walla.com",
                    "@gmail.co.il",
                    "@gmail.com",
                    "@aac.ac.co.il",
                    "@aac.ac.com",
                ];
                const isValidEmail = validDomains.some((domain) => value.includes(domain));
                setValidation((prev) => ({ ...prev, email: isValidEmail }));
                break;
            }
            case "age":{
                const ageNumber = parseInt(value, 10);
                const isValidAge = ageNumber > 0 && ageNumber <= 120;
                setValidation((prev) => ({ ...prev, age: isValidAge }));
                break;
            }
            default:
                break;
        }
    };

    const handleCheck = () => {
        const newChecked = !checked;
        setChecked(newChecked);
        const newConfirmTwoFactor = !confirmTwoFactor;
        setConfirmTwoFactor(newConfirmTwoFactor);
        setFormData((prevFormData) => ({
            ...prevFormData,
            twoFactor: newConfirmTwoFactor ? "enabled" : "disabled",
        }));
    };

    const switchError = (errorCode) => {
        switch (errorCode) {
            case 2:
                return "username";
            case 3:
                return "password";
            case 4:
                return "passwordConfirm";
            case 5:
                return "phoneNumber";
            case 6:
                return "email";
            default:
                return null;
        }
    };

    const createAccount = async () => {
        const {
            username,
            password,
            passwordConfirm,
            phoneNumber,
            email,
            age,
            twoFactor,
            fullName,
        } = formData;

        if (!confirmRadio) {
            await Swal.fire({
                title: "Please note",
                text: "You must agree to the site terms and conditions.",
                icon: "info",
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

        if (
            !username ||
            !password ||
            !passwordConfirm ||
            !phoneNumber ||
            !email ||
            age <= 0
        ) {
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

        if (username.length < 2) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                username: "",
            }));
            setErrorMessage("Username must be at least 2 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(URL_SERVER_SIDE + URL_CREATE_USER, {
                username,
                password,
                passwordConfirm,
                phoneNumber,
                email,
                age: parseInt(age, 10),
                twoFactor,
                fullName,
            });

            if (response.data.success) {
                setFormData({
                    username: "",
                    password: "",
                    passwordConfirm: "",
                    phoneNumber: "",
                    email: "",
                    fullName: "",
                    age: 0,
                    twoFactor: "disabled",
                });

                setTimeout(() => {
                    Swal.fire({
                        title: "Good job!",
                        text: "Success to add user. Email has been sent with all your details..",
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
                    setLoading(false);
                    navigate(NAV_LOGIN);
                }, TIME_LOADING);
            } else {
                const errorCode = response.data.errorCode;
                const fieldToClear = switchError(errorCode);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [fieldToClear]: "",
                }));
                setConfirmRadio(false);
                setLoading(false);
                setShowAlert(false);
                setTimeout(() => {
                    setErrorMessage(response.data.error);
                    setShowAlert(true);
                }, 50);

            }
        } catch (error) {
            console.log("Error creating user", error);
            setConfirmRadio(false);
            setLoading(false);
            setShowAlert(false);
            setTimeout(() => {
                setErrorMessage("Failed to register user. Please try again later.");
                setShowAlert(true);
            }, 50);

        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6">
            {loading && <LoadingOverlay text="Creating your account, please wait..." />}

            {!loading && showIntro && (
                <WelcomeScreen setShowIntro={setShowIntro} />
            )}

            {!loading && !showIntro && (
                <motion.div
                    className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg"
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.6}}
                >

                    <h2 className="text-3xl font-bold text-center mb-1 text-gray-600">
                        Create your account on
                    </h2>
                    <div className="relative text-center mb-6">
                        <h2 className="text-3xl font-bold inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent relative z-10">
                            SocialNetwork
                        </h2>

                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-52 h-1 bg-blue-200 rounded-md z-0"></div>
                    </div>


                    <div className="flex items-center w-full relative justify-between mb-16"
                         style={{marginTop: "44px"}}>
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex-1 flex justify-center">
                                {index !== 0 && (
                                    <div
                                        className={`absolute top-6 left-0 w-1/2 h-0.5 z-0 transition-all duration-500 ${
                                            index <= currentStep ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                    ></div>
                                )}

                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                                        index <= currentStep
                                            ? "bg-blue-500 border-blue-500 text-white"
                                            : "bg-gray-200 border-gray-300 text-gray-600"
                                    } z-10`}
                                >
                                    {index === 0 && <UserIcon className="w-5 h-5"/>}
                                    {index === 1 && <LockClosedIcon className="w-5 h-5"/>}
                                    {index === 2 && <CheckIcon className="w-5 h-5"/>}
                                </div>

                                {index !== steps.length - 1 && (
                                    <div
                                        className={`absolute top-6 right-0 w-1/2 h-0.5 z-0 transition-all duration-500 ${
                                            index < currentStep ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                    ></div>
                                )}

                                <div className="absolute top-16 text-center">
                                    <p
                                        className={`text-sm transition-colors duration-500 ${
                                            index <= currentStep ? "text-blue-700" : "text-gray-400"
                                        }`}
                                    >
                                        {step.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -50}}
                            transition={{duration: 0.4}}
                            className="space-y-4"
                        >

                            {currentStep === 0 && (
                                <>
                                    <div className="relative">
                                        <UserIcon
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type="text"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Username"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        <div className="h-5 mt-1">
                                            {!validation.username && formData.username && (
                                                <div className="text-red-500 text-sm flex items-center">
                                                    <AlertTriangleIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                                    Username must be at least 2 characters.
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    <div className="relative">
                                        <MailIcon
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        <div className="h-5 mt-1">
                                            {!validation.email && formData.email && (
                                                <div className="text-red-500 text-sm flex items-center mt-1">
                                                    <AlertTriangleIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                                    Invalid email domain.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <PhoneIcon
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type="number"
                                            id="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        <div className="h-5 mt-1">
                                            {!validation.phoneNumber && formData.phoneNumber && (
                                                <div className="text-red-500 text-sm flex items-center mt-1">
                                                    <AlertTriangleIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                                    Must start with 05 and be 10 digits.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </>
                            )}


                            {currentStep === 1 && (
                                <>
                                    <div className="relative">
                                        <LockClosedIcon
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        {formData.password && (
                                            <div
                                                className="absolute right-3 top-4 cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOffIcon className="w-5 h-5 text-gray-500"/>
                                                ) : (
                                                    <EyeIcon className="w-5 h-5 text-gray-500"/>
                                                )}
                                            </div>
                                        )}
                                        <div className="h-5 mt-1">
                                            {!validation.password && formData.password && (
                                                <div className="text-red-500 text-sm flex items-center mt-1">
                                                    <AlertTriangleIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                                    Min 8 chars, uppercase, number & special char.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <IconLockCheck
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="passwordConfirm"
                                            value={formData.passwordConfirm}
                                            onChange={handleChange}
                                            placeholder="Confirm Password"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        {formData.passwordConfirm && (
                                            <div
                                                className="absolute right-3 top-4 cursor-pointer"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOffIcon className="w-5 h-5 text-gray-500"/>
                                                ) : (
                                                    <EyeIcon className="w-5 h-5 text-gray-500"/>
                                                )}
                                            </div>
                                        )}
                                        <div className="h-5 mt-1">
                                            {!validation.passwordConfirm && formData.passwordConfirm && (
                                                <div className="text-red-500 text-sm flex items-center mt-1">
                                                    <AlertTriangleIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                                    Passwords do not match.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <Checkbox checked={checked} onClick={handleCheck}/>
                                        <span className="text-sm">Enable Two-Factor Authentication</span>
                                    </div>
                                </>
                            )}


                            {currentStep === 2 && (
                                <>
                                    <div className="relative">
                                        <UserIcon
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Full Name (Optional)"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        <div className="h-5 mt-1"></div>
                                    </div>

                                    <div className="relative">
                                        <FaBirthdayCake
                                            className="w-5 h-5 absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type="number"
                                            id="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="Age"
                                            className="w-full py-3 pl-12 pr-4 border rounded focus:outline-none"
                                        />
                                        <div className="h-5 mt-1">
                                            {!validation.age && (formData.age < 0 || formData.age > 120) && (
                                                <div className="text-red-500 text-sm flex items-center mt-1">
                                                    <AlertTriangleIcon className="w-4 h-4 text-yellow-400 mr-1"/>
                                                    Age must be between 1-120.
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    <TermsAgreement setConfirmRadio={setConfirmRadio}/>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>


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


                    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 mt-10">

                        <motion.button
                            whileTap={{scale: 0.95}}
                            onClick={() => {
                                if (currentStep === 0) {
                                    setShowIntro(true);
                                } else {
                                    prevStep();
                                }
                            }}
                            className="w-full md:w-40 py-3 bg-gray-400 text-white rounded text-center"
                        >
                            {currentStep === 0 ? "Return back" : "Previous"}
                        </motion.button>

                        {currentStep < steps.length - 1 ? (
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={nextStep}
                                className="relative overflow-hidden w-full md:w-40 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 shadow-md transition text-center rounded"
                            >
                                <span className="relative z-10">Next</span>
                                <span
                                    className="absolute top-0 left-[-95%] w-full h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                onClick={createAccount}
                                className="relative overflow-hidden w-full md:w-52 bg-gradient-to-r from-green-500 to-green-400 text-white py-3 shadow-md transition text-center rounded"
                            >
                                <span className="relative z-10">Sign Up</span>
                                <span
                                    className="absolute top-0 left-[-75%] w-[90%] h-full bg-white opacity-10 rotate-45 transform animate-shine"></span>
                            </motion.button>
                        )}
                    </div>


                </motion.div>
            )}
        </div>
    );
}