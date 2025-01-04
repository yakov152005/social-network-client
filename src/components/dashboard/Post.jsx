import React, { useState } from "react";
import "../../css/components/PostStyle.css";
import FormatDate from "../../utils/FormatDate";
import img_null from "../../assets/navbar/User_Profile_null.png"

export default function Post({ posts }) {
    const [selectedPost, setSelectedPost] = useState(null);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleClose = () => {
        setSelectedPost(null);
    };

    return (
        <div>
            <div className="post-grid">
                {posts.map((post, index) => (
                    <div className="post-item" key={index} onClick={() => handlePostClick(post)}>
                        <img src={post.imageUrl || null} alt="Post" />
                        <div className="overlay-post">
                            <p>
                                ❤️ {post.likesCount || 0} | 💬 {post.commentCount || 0}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPost && (
                <div className="modal-post">
                    <div className="modal-content-post">
                        <button className="close-button-post" onClick={handleClose}>
                            X
                        </button>
                        <img src={selectedPost.imageUrl || img_null} alt="Selected Post" />
                        <div className="post-details">
                            <p><strong>Likes:</strong> {selectedPost.likesCount || 0}</p>
                            <p><strong>Comments:</strong> {selectedPost.commentCount || 0}</p>
                            <p><strong>Content:</strong> {selectedPost.content}</p>
                            <p><strong>Date:</strong> {FormatDate(selectedPost.date)}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
