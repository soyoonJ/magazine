import React from "react";
import { Grid, Text, Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck, passwordCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    // id, pwd, user_name 아무것도 없으면 알럿창 띄우기
    if (id === "" || pwd === "" || user_name === "") {
      window.alert('아이디, 패스워드, 닉네임을 모두 입력해주세요!')
      return;
    }

    // 이메일 형식 체크
    if(!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다!')
      return;
    }

    if(!passwordCheck(pwd)) {
      window.alert('비밀번호는 영문,숫자,특수문자 최소 1개를 포함하여 8-16자리로 입력해주세요')
    }
    
    if (pwd !== pwd_check) {
      window.alert('패스워드와 패스워드 확인이 일치하지 않습니다!')
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };
  
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
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
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              // setPwd에 입력한 값 넣어주기
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button disabled={false} text="회원가입하기" _onClick={signup}></Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;