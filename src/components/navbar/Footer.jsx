import { NavLink } from "react-router-dom";
import "../../css/websiteRegulations/FooterStyle.css";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import {NAV_ACCESSIBILITY, NAV_TERM_AND_PRIVACY} from "../../utils/Constants.js";

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-links">
                    <NavLink to={NAV_TERM_AND_PRIVACY} className="footer-link">תקנון ותנאי שימוש</NavLink>
                    <NavLink to={NAV_ACCESSIBILITY} className="footer-link">הצהרת נגישות</NavLink>
                </div>

                <div className="social-links">
                    <a href="https://www.linkedin.com/in/yakov-ben-hemo-8b8557245/" target="_blank"
                       rel="noopener noreferrer">
                        <FaLinkedin className="social-icon"/>
                    </a>
                    <a href="https://github.com/yakov152005" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="social-icon"/>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100000346264650" target="_blank"
                       rel="noopener noreferrer">
                        <FaFacebookF className="social-icon"/>
                    </a>
                </div>


                <div className="footer-brand">
                    <span>Developed By Yakov Ben-Hemo ©2025 Social Network System</span>
                </div>

                <img src={"/iconSocialNetWorkTheOriginalOne.png"} alt={"Logo Social NetWork"} width={"45px"} height={"45px"}
                     style={{borderRadius: "15px", marginLeft: "-145px"}}/>
            </div>
        </footer>
    );
}
