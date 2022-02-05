import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"

const PostDetail = () => {

    return (
        <React.Fragment>
            <Post></Post>
            <CommentWrite></CommentWrite>
            <CommentList></CommentList>
        </React.Fragment>
    )
}

export default PostDetail;



