import {createAction, handleAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { firestore, storage } from "../../shared/firebase";

// 자바스크립트에서 날짜, 시간 쉽게 다루기 위한 것
import moment from "moment";

import { actionCreators as imageActions } from "./image";

// 액션타입 만들어줌
const LIKE_POST = "LIKE_POST";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// 액션 만들어줌
const likePost = createAction(LIKE_POST,(post_id) => ({post_id}))
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id,post}));
const deletePost = createAction(DELETE_POST, (post_idx) => ({post_idx}));

// initialState 생성
const initialState = {
    list: [],
}

const initialPost = {
  // user 정보 이미 다 저장되어 있기 때문에 필요 없음
  // id: 0,
  // user_info: {
  //   user_name: "soyoon",
  //   user_profile:
  //     "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
  // },
  image_url:
    "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
  contents: "고양이네요!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),

  user_like: [],
  
};

const likePostFB = (post_id = null) => {
  return function (dispatch, getState, {history}) {
    const postDB = firestore.collection('post');
    const user_id = getState().user.user.uid;
    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
    console.log(getState().post.list[0].user_info.user_like)

    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        // doc.data() -> 파이어스토어에서 가져온 데이터
        let _post = doc.data();
        // console.log(..._post[_post_idx]);




      });
    });

    

  }
}


// 값이 안 들어왔을 때 튕겨내기 위해 null 값과 {} 값 주는거!
const editPostFB = (post_id = null, post = {}) => {
 return function (dispatch, getState, {history}) {
    
    if(!post_id) {
        console.log('게시물 정보가 없어요!')
       return; 
    }

    // 이미지 새로 올렸는지 안 올렸는지 파악하기 위해 preview 값 먼저 가져옴
    const _image = getState().image.preview;
    // 인덱스 번호 가져오기
    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
    // 타겟 인덱스에 해당하는 list 가져오기
    const _post = getState().post.list[_post_idx];

    // console.log(_post);

    // firestore에서 post 콜렉션의 db 가져오기
    const postDB = firestore.collection('post');

    if (_image === _post.image_url) {
      postDB.doc(post_id).update(post).then(doc => {
        dispatch(editPost(post_id, {...post}))
        history.replace('/');
      });

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

    // user 가져옴
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      // id가 따로 없고, uid로 했었음
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      value: value,
      // 작업이 이뤄지는 시간
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
      user_like : [{[_user.uid]: false}],
    };
    console.log(_post);

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
              // 리덕스에 파이어베이스랑 데이터 형태 맞춰서 넣어줘야 함
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
    

// firestore에 있는 문서 : 웹 > 데이터 가져오기 참고
const getPostFB = () => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");

        // db가져오기
        postDB.get().then((docs) => {
            let post_list = [];
            // doc 돌면서 꺼내주기
            docs.forEach((doc) => {
                // doc.data() -> 파이어스토어에서 가져온 데이터
                let _post = doc.data();
                // Object.keys() -> key값만 뽑아서 배열로 만들어 줌
                // ['comment_cnt', 'contents' ... ] 같이!!
                let post = Object.keys(_post).reduce((acc, cur)=>{
                    // index가 -1이 아니라는건 하나라도 있다는거! -> cur가 user_를 포함한다면!!
                    // user_info에다가 user_profile, user_name 등 다 묶기 위해 user 포함과 미포함으로 나눔
                    if(cur.indexOf("user_") !== -1){
                        return {
                            ...acc,
                            // user_info 안에 key:value 넣어줌
                            user_info: {...acc.user_info, [cur]: _post[cur]}};
                    }
                    // ...acc -> 쉼표 뒤에 넣어준 id값
                    // [cur] -> key 값
                    // _post[cur] -> value 값
                    // 유저 정보 + key:value값
                    return {...acc, [cur]:_post[cur]};
                    // doc에 id는 제외하고 들어가 있기 때문에 id값/user_info는 따로 넣어줌
                },{id: doc.id, user_info: {}});

                // 빈 배열인 post_list에 post 넣기
                post_list.push(post);

            })

            // console.log(post_list);
            // 리덕스 반영을 위해 setPost에 post_list 보내주기
            dispatch(setPost(post_list))
        })
    }
}



const deletePostFB = (post_id=null) => {
  return function (dispatch, getState, {history}) {
      const postDB = firestore.collection("post");
      const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
      // const _post = getState().post.list[_post_idx];
      // console.log(_post)

      postDB.doc(post_id).delete().then(()=> {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      })

      // 리덕스에도 반영하기 위해 
      dispatch(deletePost(_post_idx));
      history.replace("/");


      // const docRef = doc(db, "post", post_id);
      // deleteDoc(docRef);

      // dispatch(deletePost(post_id))
  }
}



// reducer 작성
export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft)=> {
            // initialState에서 list는 빈배열
            // action에 넘어 온 post_list 반영해주기
            draft.list = action.payload.post_list;
        }),

        [ADD_POST] : (state, action) => produce(state, (draft) => {
            // 리스트 맨 앞에다가 추가항목 붙여줌
            draft.list.unshift(action.payload.post);
        }),

        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            // id로 뭘 고칠 건지 찾기
            // 전체 리스트랑 받아온 post_id를 비교해서 같은 거의 인덱스 찾기
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            // 찾은 인덱스를 활용해서 전체리스트에서 타겟 리스트 뽑아낸 후에
            // 받아온 내용으로 덮어주기!!
            draft.list[idx] = {...draft.list[idx], ...action.payload.post};
        }),

        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            let deleted = draft.list.filter((e,i) => {
              return parseInt(action.payload.post_idx) !== i
            })
            draft.list = deleted;
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
    deletePostFB,
    likePostFB,
}

// export
export {actionCreators};

// 다 작성하고 configureStore에 임포트도 같이 해줘야 함