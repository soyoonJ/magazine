import {createAction, handleAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

// 액션타입 만들어줌
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// 액션 만들어줌
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id,post}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));

// initialState 생성
const initialState = {
    list: [],
}

const initialPost = {

      // image_url: "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
      // contents: "",
      // comment_cnt: 0,
      // insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const editPostFB = (post_id = null, post = {}) => {
 return function (dispatch, getState, {history}) {
    
    if(!post_id) {
        console.log('게시물 정보가 없어요!')
       return; 
    }
    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    // console.log(_post);

    const postDB = firestore.collection('post');

    if (_image === _post.image_url) {
      

      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            postDB
            .doc(post_id)
            .update({...post, image_url: url})
            .then((doc) => {
              dispatch(editPost(post_id, { ...post, image_url: url }));
              history.replace("/");
            });

          });
           })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
    }
  }
}


const addPostFB = (contents = "", value = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      value: value,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    // console.log(_post);

    const _image = getState().image.preview;
    // console.log(_image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요!");
              console.log("post 작성에 실패했어요!", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
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

            })

            // console.log(post_list);

            dispatch(setPost(post_list))
        })
    }
}



// const deletePostFB = (post_id) => {
//   return function (dispatch, getState, {history}) {
//       // const postDB = firestore.collection("post");
//       const docRef = doc(db, "post", post_id);
//       deleteDoc(docRef);

//       dispatch(deletePost(post_id))
//   }
// }



// reducer 작성
export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft)=> {
            draft.list = action.payload.post_list;
        }),

        [ADD_POST] : (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        }),

        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            draft.list[idx] = {...draft.list[idx], ...action.payload.post};
        }),

        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            let deleted = draft.list.filter((e,i) => {
              return parseInt(action.payload.post_id) !== i
            })
            draft.list = deleted
        }),

    }, initialState
);

// export 하기 전 묶어주기
const actionCreators = {
    setPost,
    addPost,
    editPost,
    deletePost,
    getPostFB,
    addPostFB,
    editPostFB,
    // deletePostFB,
}

// export
export {actionCreators};