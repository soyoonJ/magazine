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
    // const layout = useSelector((state) => state.post.list);
    // console.log(layout)
    // console.log(props.value)

    const {history} = props;

    // console.log(post_list);

    React.useEffect(() => {
        // getPostFB 불러오기
        // post_list가 0일 때만 getPostFB 하는거!
        // 그럼 이미 리스트 있을 때는 getPostFB 따로 안하고 기존에 있던 리덕스에서 불러옴
        if(post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
    // 처음 페이지 켰을 때 한번만 불러오기 때문에 빈 배열
    }, []);

    return (
        <React.Fragment>
            <Grid bg={"#F0F1F2"} padding="20px 0px">
            {/* <Post/> */}
            {/* 게시물 개수만큼 map 돌려서 불러오기 */}
            {post_list.map((p,idx) => {
                // 옵셔널 체이닝
                if(p.user_info.user_id === user_info?.uid){
                    return (
                        // 클릭했을 때 id값 주소로 이동
                        <Grid
                            bg="#ffffff"
                            margin= "8px 0px"
                            key={p.id}
                            _onClick={() => {
                                history.push(`/post/${p.id}`);
                            }}>
                            <Post key={p.id} {...p} is_me/>
                        </Grid>
                    )
                } else {
                    return (
                        <Grid bg="#ffffff"
                            key={p.id}
                            _onClick={() => {
                                history.push(`/post/${p.id}`);
                            }}>
                            <Post key={p.id} {...p} />
                        </Grid>
                    )
                }
                
            })}
            </Grid>
        </React.Fragment>
    )
}

export default PostList;

