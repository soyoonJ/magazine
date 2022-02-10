import React from "react";
import {Grid, Text, Button} from "../elements";
// import {getCookie, deleteCookie} from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";
// import { FaGuitar } from 'react-icons/fa';
// import Permit from "../shared/Permit";

const Header = (props) => {
  const dispatch = useDispatch();
  // 로그인 됐는지 안됐는지 판별

  // is_login true/false에 따라 헤더 다르게 보여주기
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  // console.log(is_session);
  // console.log(sessionStorage.getItem(_session_key))

  // 로그인되어있고, 세션 있을 경우에만 내정보/알림/로그아웃 헤더 보여주기
  if (is_login && is_session) {
    return (
      <React.Fragment>
            <Grid is_flex padding="4px 16px" bg="#FFFFFF">
              <Grid>
                <Text margin="0px" size="24px" bold>
                  🎉
                </Text>
              </Grid>

              <Grid is_flex>
                <Button margin="3px" text="내정보"></Button>
                <Button _onClick={() => {
                  history.push("/noti");
                }} margin="3px" text="알림"></Button>
                {/* 쿠키는 삭제 됐지만 부모/자식이 변한게 아니기 때문에 리렌더링 되지 않음 */}
                <Button
                  margin="3px"
                  text="로그아웃"
                  _onClick={() => {
                    dispatch(userActions.logoutFB());
                  }}
                ></Button>
              </Grid>
            </Grid>
          </React.Fragment>
    );
  
                }
  
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px" bg="#F2EBD5">
        <Grid>
          <Text margin="0px" size="24px" bold>
            🎉
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            margin="3px"
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            margin="3px"
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Header.defaultProps = {}

export default Header;