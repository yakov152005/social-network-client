import { NavLink } from "react-router-dom";
import "../../css/websiteRegulations/FooterStyle.css";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_ACCESSIBILITY, NAV_TERM_AND_PRIVACY } from "../../utils/Constants.js";
import logo from "../../assets/image/iconSocialNetWorkTheOriginalOne.png";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">


                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <NavLink to={NAV_TERM_AND_PRIVACY} className="footer-link">Terms & Privacy</NavLink>
                    <NavLink to={NAV_ACCESSIBILITY} className="footer-link">Accessibility</NavLink>
                </div>


                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <Tooltip title="LinkedIn">
                            <motion.a
                                href="https://www.linkedin.com/in/yakov-ben-hemo-8b8557245/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="social-icon linkedin">
                                <FaLinkedin className="icon" />
                            </motion.a>
                        </Tooltip>
                        <Tooltip title="GitHub">
                            <motion.a
                                href="https://github.com/yakov152005"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="social-icon github">
                                <FaGithub className="icon" />
                            </motion.a>
                        </Tooltip>
                        <Tooltip title="Facebook">
                            <motion.a
                                href="https://www.facebook.com/profile.php?id=100000346264650"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1, y: -5 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="social-icon facebook">
                                <FaFacebook className="icon" />
                            </motion.a>
                        </Tooltip>
                    </div>
                </div>


                <div className="footer-section">
                    <h4>About</h4>
                    <span>Developed by <motion.span className="text-s font-bold text-blue-600">Yakov Ben-Hemo</motion.span> ©2025</span>
                    <img src={logo} alt="Social Network Logo" className="footer-logo" />
                </div>
            </div>
        </footer>
    );
}
