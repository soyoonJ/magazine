import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import {getCookie, setCookie, deleteCookie} from "../shared/Cookie"

import {useDispatch} from "react-redux"
// as~ 쓰면 ~라고 별명 지어주는거!
import {actionCreators as userActions} from "../redux/modules/user"
import { emailCheck } from "../shared/common";

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {

    console.log(id);


    if(id === '' || pwd === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    // 이메일 유효성 체크는 shared/common 컴포넌트에서!!
    if(!emailCheck(id)){
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    // setCookie("user_id", "perl", 3);
    // setCookie("user_pwd", "pppp", 3);
    dispatch(userActions.loginFB(id, pwd));

  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>


        <Button
          disabled={(id === '' || pwd === '')? true : false}
          text="로그인하기"
          _onClick={() => {
            console.log("로그인 했어!");
            login();
          }}
        ></Button>
       


        {/* <Button
          `{(id === '' || pwd === '')?disabled:null}`
          text="로그인하기"
          _onClick={() => {
            console.log("로그인 했어!");
            login();
          }}
        ></Button>   */}








      </Grid>
    </React.Fragment>
  );
};

export default Login;
