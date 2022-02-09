// 액션 만들어주는 것들
import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";

import {setCookie, getCookie, deleteCookie} from "../../shared/Cookie"

import {auth} from "../../shared/firebase"
// import firebase from "firebase/app"

import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";


const LIKE = "LIKE";

const like = createAction(LIKE, (post_id, user)=>({post_id, user}));


const initialState = {
    is_check: false,
    // user: null,
    // is_login: false,
};


const likeFB = (post_id="", user="") => {
    return function (dispatch, getState, {history}) {
        

    }
}





// 리듀서
export default handleActions({
    [LIKE]: (state, action) => produce(state, (draft)=>{

    }),



    }, initialState

);

// action creator export
const actionCreators = {
    like,
};


export { actionCreators }