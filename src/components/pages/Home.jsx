import React, { useState, useEffect } from "react";
import appWriteService from '../../appwrite/configration'
import { Container, PostCard } from "../index";
const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {

        appWriteService.GetPosts().then((posts) => {
            console.log("Fetched Posts:", posts);
            if (posts) {
                setPosts(posts.documents || [])
            }

        })
    }, [])
   
    if (posts.length === 0) {
        //setPosts([{ $id: "1", title: "Dummy Post", content: "This is dummy data." }]);
        return (
            <>
                <div className="w-full">
                    <Container>
                        <h1> Please login to see the post</h1>
                    </Container>
                </div>
            </>
        )

    } else {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }

}
export default Home