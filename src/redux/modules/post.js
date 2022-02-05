import {createAction, handleAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { firestore } from "../../shared/firebase";


// 액션타입 만들어줌
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// 액션 만들어줌
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}));

// initialState 생성
const initialState = {
    list: [],
}

const initialPost = {
    // id도 같이 추가
    id:0,
    // Post.js에서 defaultProps 복사
    user_info: {
        user_name: "soyoon",
        user_profile: "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
      },
      image_url: "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
      contents: "고양이네요!",
      comment_cnt: 10,
      insert_dt: "2021-02-27 10:00:00",
};


const getPostFB = () => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");

        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc) => {
                let _post = doc.data();


                let post = Object.keys(_post).reduce((acc, cur)=>{
                    
                    // 포함이 된다면!
                    if(cur.indexOf("user_") !== -1){
                        return {
                            ...acc,
                            user_info: {...acc.user_info, [cur]: _post[cur]}};
                    }
                    return {...acc, [cur]:_post[cur]};
                },{id: doc.id, user_info: {}});

                post_list.push(post);

                // let _post = {
                //     id: doc.id,
                //     ...doc.data()
                // };

                // let post = {
                //     id:doc.id,
                //     user_info: {
                //         user_name: _post.user_name,
                //         user_profile: _post.user_profile,
                //         user_id: _post.user_id,
                //       },
                //       image_url: _post.image_url,
                //       contents: _post.contents,
                //       comment_cnt: _post.comment_cnt,
                //       insert_dt: _post.insert_dt,

                // };

                // post_list.push(post);
            })

            console.log(post_list);

            dispatch(setPost(post_list))
        })
    }
}

// reducer 작성
export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft)=> {
            draft.list = action.payload.post_list;
        }),

        [ADD_POST] : (state, action) => produce(state, (draft) => {

        })
    }, initialState
);

// export 하기 전 묶어주기
const actionCreators = {
    setPost,
    addPost,
    getPostFB,
}

// export
export {actionCreators};