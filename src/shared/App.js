
import './App.css';
import './Style.css';
import React from "react";

import {BrowserRouter, Route} from "react-router-dom";

// history를 여기에서 만들긴 했지만, react-router-dom에서 useHistory로 사용 가능
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

// pages 폴더에 있는 컴포넌트 import
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Search from './Search';
import Notification from '../pages/Notification';

import Header from "../components/Header";
import {Grid, Button} from "../elements";

import { useDispatch } from 'react-redux';
import {actionCreators as userActions} from "../redux/modules/user";

import {apiKey} from "./firebase";
import Permit from './Permit';

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;


  // 로그인 유지하기 위해 App.js에서 세션 체크 진행
  React.useEffect(()=>{
   
    if (is_session){
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid width="60%" margin ="auto">
        <Header></Header>
        <ConnectedRouter history={history}>
          {/* pages import 후에 각 페이지의 주소 만들어주기 */}
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
          <Route path="/write/:id" exact component={PostWrite}/>
          <Route path="/post/:id" exact component={PostDetail}/>
          {/* <Route path="/search" exact component={Search}/> */}
          <Route path="/noti" exact component={Notification}/>
        </ConnectedRouter>
      </Grid>
      <Permit>
        {/* 메인에 추가버튼 추가 -> 버튼 컴포넌트에 float버튼으로 추가 */}
        <Button is_float text="+" _onClick={() => {history.push("/write")}}></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
