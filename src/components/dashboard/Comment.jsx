import React, { useState } from "react";
import axios from "axios";
import {
    URL_SERVER_SIDE,
    URL_ADD_COMMENT,
    URL_SHOW_ALL_COMMENT_POST,
    NAV_PROFILE,
    NAV_PROFILE_SEARCH_BASE
} from "../../utils/Constants"
import FormatDate from "../../utils/FormatDate"
import "../../css/components/CommentStyle.css"
import img_null from "../../assets/navbar/User_Profile_null.png"
import {useNavigate} from "react-router-dom";

export default function Comment({ postId, username ,commentCount: initialCommentCount}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [noShowComments,setNoShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(initialCommentCount);
    const navigate = useNavigate();


    const fetchComments = async () => {
        if (!postId || showComments) {
            return;
        }

        try {
            const response = await axios.get(URL_SERVER_SIDE + URL_SHOW_ALL_COMMENT_POST + `/${postId}`);
            if (response.data.success) {
                setComments(response.data.comments);
                setShowComments(true);
                setNoShowComments(false)
            } else {
                console.error("Error fetching comments:", response.data.error);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        try {
            const payload = {
                postId,
                username,
                content: newComment,
            };

            const response = await axios.post(URL_SERVER_SIDE + URL_ADD_COMMENT, payload);

            if (response.data.success) {
                setComments((prev) => [
                    ...prev,
                    { id: `temp-${Date.now()}`, username, content: newComment, date: new Date() },
                ]);
                setCommentCount((prevCount) => prevCount + 1);
                setNewComment("");
            } else {
                console.error("Error adding comment:", response.data.error);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleUserClick = (usernameSearch) => {
        if (usernameSearch === username){
            navigate(NAV_PROFILE);
            return;
        }

        navigate(NAV_PROFILE_SEARCH_BASE + `/${usernameSearch}`);
    };

    return (
        <div className="comment-section">
            {!showComments ? (
                <div className={"comment-btn-show-comment"}>
                    <button className="btn btn-link" onClick={fetchComments} style={{color: "gray",fontSize:"15px",textDecoration: "none"}}>
                        {commentCount > 0 && (<div>Show all {commentCount} comments</div>)}
                    </button>
                </div>
            ) : (
                <div>

                    <div className={"comment-btn-show-comment"}>
                    <button className="btn btn-link" onClick={() => setShowComments(false)}
                            style={{color: "gray", fontSize: "15px", textDecoration: "none"}}>
                        {!noShowComments && commentCount > 0 && (<div>Hide all {commentCount} comments</div>)}
                    </button>
                    </div>

                    <ul className="comments-list">
                        {comments.map((comment, index) => (
                            <li key={comment.id || `comment-${postId}-${index}`}>

                                <div
                                    style={{display: "flex", alignItems: "center", fontSize: "15px", cursor: "pointer"}}
                                    onClick={() => handleUserClick(comment.username)}>
                                    <img
                                        src={comment.profilePicture || img_null}
                                        alt={comment.username}
                                        style={{
                                            borderRadius: "50%",
                                            marginLeft: "7px",
                                            marginRight: "10px",
                                            width: "40px",
                                            height: "40px"
                                        }}
                                    />
                                    <strong style={{color: "darkblue", marginRight: "8px"}}>{comment.username}</strong>
                                    <div style={{cursor: "default"}} onClick={(e) => e.stopPropagation()}>
                                        {comment.content}
                                    </div>
                                </div>


                                <div style={{fontSize: "small", color: "gray", marginLeft: "8px"}}>
                                    {comment.date ? FormatDate(comment.date) : "Unknown date"}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="comment-input-container">
                <textarea
                    className="comment-textarea"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                {newComment.trim() && (
                    <button className="comment-submit-button" onClick={handleAddComment}>
                        Post
                    </button>
                )}
            </div>
        </div>
    );
}
