// PostList.js
// 목록페이지(메인)
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import { Text, Input, Grid, Button } from "../elements";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=>state.post.list);
    const user_info = useSelector((state)=> state.user.user);
    // const is_loading = useSelector((state) => state.post.is_loading);

    const {history} = props;

    console.log(post_list);

    React.useEffect(() => {

        if(post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
        
    }, []);

    return (
        <React.Fragment>
            <Grid bg={"EFF6FF"} padding="20px 0px">
            {/* <Post/> */}
            {post_list.map((p,idx) => {
                if(p.user_info.user_id === user_info?.uid){
                    return (
                        <Grid
                            bg="#ffffff"
                            margin= "8px 0px"
                            key={p.id}
                            _onClick={() => {
                                history.push(`/post/${p.id}`);
                            }}>
                            <Post key={p.id} {...p} is_me/>;
                        </Grid>
                    )
                } else {
                    return (
                        <Grid bg="#ffffff"
                            key={p.id}
                            _onClick={() => {
                                history.push(`/post/${p.id}`);
                            }}>
                            <Post {...p} />;
                        </Grid>
                    )
                }
                
            })}
            </Grid>
        </React.Fragment>
    )
}

export default PostList;

