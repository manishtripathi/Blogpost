import React, { useEffect, useState } from "react";
import {Container, PostForm} from "../index";
import appWriteService from '../../appwrite/configration'
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
    const [post, setPost] = useState([])
    const {slug} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appWriteService.GetPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }

    }, [slug, navigate])
    
    return post ? (
        <div className="w-full py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
           
        </div>
    ): null
}
export default EditPost