import React from "react";
import "../css/dashboard/ProfileStyle.css"
import FormatDate from "../utils/FormatDate";

export default function Post({posts}) {
    return (

        <div className="post-grid">
            {
                posts.map((post, index) => (
                    <div className="post-item" key={index}>
                        {post.imageUrl && (
                            <img src={post.imageUrl} alt="Post"/>
                        )}
                        <div className="post-content">
                            <p>{post.content}</p>
                        </div>
                        <div className="post-content">
                            <p><strong>{FormatDate(post.date)}</strong></p>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}