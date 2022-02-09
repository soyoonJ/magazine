import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite"
import CommentList from "../components/CommentList"

import { useSelector } from "react-redux";

import { firestore } from "../shared/firebase";

const PostDetail = (props) => {
    const id = props.match.params.id;
    const user_info = useSelector((state)=> state.user.user);
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post_data = post_list[post_idx];

    const [post, setPost] = React.useState(post_data?post_data:null);

    React.useEffect(() => {

        if(post){
            return;
        }
        const postDB = firestore.collection("post");
        postDB.doc(id).get().then(doc => {
            console.log(doc);
            console.log(doc.data());

            let _post = doc.data();
            let post = Object.keys(_post).reduce((acc, cur)=>{
                    
                // 포함이 된다면!
                if(cur.indexOf("user_") !== -1){
                    return {
                        ...acc,
                        user_info: {...acc.user_info, [cur]: _post[cur]}};
                }
                return {...acc, [cur]:_post[cur]};
            },
            {id: doc.id, user_info: {}}
            );

            setPost(post);
        })

    }, []);

    
    return (
        <React.Fragment>
            {/* 포스트가 있을 때에만 처리하도록!! */}
            {post && <Post {...post} is_me={post.user_info.user_id === user_info.uid} />}
            <CommentWrite></CommentWrite>
            <CommentList></CommentList>
        </React.Fragment>
    )
}

export default PostDetail;



