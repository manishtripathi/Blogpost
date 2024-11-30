import React from "react";
import appWriteService from '../appwrite/configration';
import { Link } from "react-router-dom";
import fallbackImage from '../assets/react.svg';
const PostCard = ({ post }) => {


    if (!post) {
        return <p> Loading .... </p>
    }


    const { $id, title, titleimage, content } = post;
    console.log("Title Image:", titleimage);
    console.log("Generated Image URL:", appWriteService.getFilePreview(titleimage));

    return (

        <>
            <Link to={`/post/${$id}`}>
                <div className="w-full bg-gray-400 rounded-xl p-4">
                    <div className="w-full, justify-center mb-4">
                        <img
                            src={titleimage ? appWriteService.getFilePreview(titleimage) : fallbackImage}
                            alt={title || "No Title"}
                            className="rounded-xl"
                            onError={(e) => (e.target.src = fallbackImage)} // Fallback if URL is broken
                        />
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            </Link>
        </>
    )


}

export default PostCard