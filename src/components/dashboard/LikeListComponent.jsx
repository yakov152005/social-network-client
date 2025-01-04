import React from "react";
import img_null from "../../assets/navbar/User_Profile_null.png";
import "../../css/components/LikeListComponent.css";
import {NAV_PROFILE, NAV_PROFILE_SEARCH_BASE} from "../../utils/Constants";
import {useNavigate} from "react-router-dom";

export default function LikeListComponent({likesList, onClose, username}) {
    const navigate = useNavigate();

    const handleUserClick = (usernameSearch) => {
        if (usernameSearch === username) {
            navigate(NAV_PROFILE);
            return;
        }

        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h3 className="modal-title">Likes</h3>
                <ul className="like-list">
                    {likesList.map((like) => (
                        <li
                            key={like.id}
                            className="like-item"
                            style={{display: "flex", alignItems: "center", fontSize: "15px", cursor: "pointer"}}
                            onClick={() => handleUserClick(like.username)}
                        >
                            <img
                                src={like.profilePicture || img_null}
                                alt="User Profile"
                                className="like-profile-picture"
                            />
                            <div className="like-details">
                                <span className="like-username">{like.username}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
