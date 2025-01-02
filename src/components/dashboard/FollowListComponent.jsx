import img_null from "../../assets/navbar/User_Profile_null.png";
import "../../css/components/FollowListComponent.css"
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {NAV_PROFILE_SEARCH_BASE} from "../../utils/Constants";

export default function FollowListComponent({ title, list, onClose }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleUserClick = (usernameSearch) => {
        onClose();
        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };

    const filteredList = list.filter((item) =>
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h3 className="modal-title">{title}</h3>
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <ul className="follow-list">
                    {filteredList.map((profile, index) => (
                        <li key={index} className="follow-item">
                            <img
                                src={profile.profilePicture || img_null}
                                alt="Profile"
                                className="follow-profile-picture"
                                onClick={() => handleUserClick(profile.username)}
                            />
                            <div className="follow-details">
                                <span className="follow-username"  onClick={() => handleUserClick(profile.username)}>
                                    {profile.username}</span>
                                <span className="follow-button">Following</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}