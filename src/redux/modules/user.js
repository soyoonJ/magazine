import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

import {setCookie, getCookie, deleteCookie} from "../../shared/Cookie"

import {auth} from "../../shared/firebase"
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";


// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
// const logIn = createAction(LOG_IN, (user)=> ({user}));
const logOut = createAction(LOG_OUT, (user)=>({user}));
const getUser = createAction(GET_USER, (user)=>({user}));
const setUser = createAction(SET_USER, (user) => ({user}))


// initialState
// defaultProps 같은 역할
const initialState = {
    user: null,
    is_login: false,
};
 
const user_initial= {
    user_name: 'soyoon',

}

// middleware actions
// const loginAction = (user) => {
//     return function (dispatch, getState, {history}) {
//         console.log(history);
//         dispatch(setUser(user));
//         history.push('/');
//     }
// }

const loginFB = (id, pwd) => {
    return function (dispatch, getState, {history}) {
        signInWithEmailAndPassword(auth, id, pwd)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch(setUser({user_name: user.user.displayName, id: id, user_profile: ''}));
            // const user = userCredential.user;
            // ...
            history.push('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);
          });
    }
}

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {

    createUserWithEmailAndPassword(auth, id, pwd)
    .then((userCredential) => {
        console.log(userCredential);

        updateProfile(auth.currentUser, {
            displayName: user_name,
          }).then(() => {
            
            dispatch(setUser({user_name: user_name, id: id, user_profile: ''}));
          history.push('/');
          }).catch((error) => {
            console.log(error);
          });
          
      // Signed in
    //   const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
      // ..
    });
  };
};


// 리듀서
export default handleActions({
    // immer 가져오기 (produce)
    // 원본값 복사한거 draft
    [SET_USER]: (state, action) => produce(state, (draft)=>{
        setCookie("is_login", "success")
        // action creators에서 받아온 값
        draft.user = action.payload.user;
        draft.is_login = true;
    }),

    [LOG_OUT]: (state, action) => produce(state, (draft)=>{
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),

    [GET_USER]: (state, action) => produce(state, (draft)=>{

    }),
    },
    // 초기값 지정
    initialState
);

// action creator export
const actionCreators = {
    // logIn,
    loginFB,
    logOut,
    getUser,
    // loginAction,
    signupFB,
};


export { actionCreators }

// 중괄호 안에 initialState 들어가주면 됨

