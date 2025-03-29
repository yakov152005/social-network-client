import { FaFacebook, FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { MAIL_SERVICE, MAILTO, NAV_ACCESSIBILITY, NAV_CREATOR, NAV_TERM_AND_PRIVACY } from "../../utils/Constants";
import logo from "../../assets/image/iconSocialNetWorkTheOriginalOne.png";

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-white  mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row justify-between gap-12 text-gray-700 text-sm">


                <div className="flex flex-col gap-6 max-w-md">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Social Network Logo" className="w-8 h-8 rounded-lg"/>
                        <span
                            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                            Social<span
                            className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">network</span>
                        </span>
                    </div>
                    <div
                        className="w-44 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 rounded-full -mt-4 mb-1"></div>

                    <p className="leading-relaxed font-medium text-lg text-gray-600">
                        Welcome to my social networking site. Here you can enjoy online chat, share posts, follow
                        friends, comment, like and just have fun.
                    </p>
                </div>


                <div className="flex flex-col gap-4 items-start md:items-center">
                    <div>
                        <h4 className="font-semibold text-xl">Follow Us</h4>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 rounded-full mt-1 mb-4"></div>
                    </div>
                    <div className="flex gap-4">
                        <Tooltip title="LinkedIn">
                            <motion.a
                                href="https://www.linkedin.com/in/yakov-ben-hemo-8b8557245/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-[#005582] hover:bg-[#005582] hover:text-white "
                            >
                                <FaLinkedin className="text-xl" />
                            </motion.a>
                        </Tooltip>
                        <Tooltip title="GitHub">
                            <motion.a
                                href="https://github.com/yakov152005"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white"
                            >
                                <FaGithub className="text-xl" />
                            </motion.a>
                        </Tooltip>
                        <Tooltip title="Facebook">
                            <motion.a
                                href="https://www.facebook.com/profile.php?id=100000346264650"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-[#1877f2] hover:bg-[#1877f2] hover:text-white "
                            >
                                <FaFacebook className="text-xl" />
                            </motion.a>
                        </Tooltip>
                    </div>
                </div>


                <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="font-semibold text-xl">Quick Links</h4>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 rounded-full mt-1 mb-4"></div>
                    </div>
                    {[
                        { text: "Terms & Privacy", path: NAV_TERM_AND_PRIVACY },
                        { text: "Accessibility", path: NAV_ACCESSIBILITY },
                        { text: "Creator", path: NAV_CREATOR },
                    ].map((link, index) => (
                        <motion.div
                            key={index}
                            onClick={() => navigate(link.path)}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-2 text-gray-700 cursor-pointer group"
                        >
                            <FaArrowRight className="text-blue-600 transition" />
                            <span className="text-base group-hover:text-blue-600 transition">{link.text}</span>
                        </motion.div>
                    ))}

                </div>


                <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="font-semibold text-xl">Contact</h4>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 rounded-full mt-1 mb-4"></div>
                    </div>
                    <a href={MAILTO + MAIL_SERVICE} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition no-underline text-base">
                        <FaEnvelope className="text-blue-600" /> servicenetwork62@gmail.com
                    </a>
                    <a href="https://wa.me/+972526650754" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition no-underline text-base">
                        <FaWhatsapp className="text-blue-600" /> WhatsApp
                    </a>
                </div>
            </div>


            <div className="bg-gradient-to-b from-white to-blue-100 md:bg-gradient-to-br from-white to to-blue-50 py-4 border-t">
                <div
                    className="max-w-7xl mx-auto px-16 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🅰️</span>
                        © {new Date().getFullYear()} All Rights Reserved.
                    </div>
                    <div className={"text-sm"}>
                        Made with <span className="text-red-500">❤️</span> Developed By{" "}
                        <span className="font-bold  bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                            Yakov Ben-Hemo ©2025
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
