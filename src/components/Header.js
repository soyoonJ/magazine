import React from "react";
import {Grid, Text, Button} from "../elements";
import {getCookie, deleteCookie} from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import {history} from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state)=> state.user.is_login);

    // const [is_login, setIsLogin] = React.useState(false);

    // React.useEffect(()=> {
    //     let cookie=getCookie("user_id");
    //     console.log(cookie);

    //     if(cookie) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false)
    //     }
    // })

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key)? true : false;
    console.log(is_session)

    if (is_login && is_session) {
      return (
        <React.Fragment>
          <Grid is_flex padding="4px 16px">
            <Grid>
              <Text margin="0px" size="24px" bold>
                헬로
              </Text>
            </Grid>

            <Grid is_flex>
              <Button text="내정보"></Button>
              <Button text="알림"></Button>
                {/* 쿠키는 삭제 됐지만 부모/자식이 변한게 아니기 때문에 리렌더링 되지 않음 */}
              <Button
              text="로그아웃"
              _onClick={()=> {dispatch(userActions.logoutFB())}}></Button>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    
    
    
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>헬로</Text>
                </Grid>
                
                <Grid is_flex>
                    <Button text="로그인"
                     _onClick={()=> {history.push('/login')}}
                    ></Button>
                    <Button text="회원가입" _onClick={()=> {
                      history.push('/signup');
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;