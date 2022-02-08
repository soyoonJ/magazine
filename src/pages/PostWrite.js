import React from "react";
import {Grid, Text, Button, Image, Input} from "../elements"
import Upload from "../shared/Upload";

import {useSelector, useDispatch} from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state)=>state.post.list);

    // console.log(props.match.params.id);

    const post_id = props.match.params.id;
    const is_edit = post_id? true : false;

    const {history} = props;

    let _post = is_edit? post_list.find((p)=> p.id === post_id) : null;


    const [contents, setContents] = React.useState(_post? _post.contents : '');
    const [value, setValue] = React.useState('');

    // 리덕스에서 처리하도록 짰기 때문에 새로고침 하면 데이터 날라감.
    // 때문에 새로고침하면 원래 페이지로 돌아가게 추가
    React.useEffect(()=> {
      if(is_edit && !_post) {
        console.log('포스트 정보가 없어요!')
        history.goBack();

        return;
      }

      if(is_edit) {
        dispatch(imageActions.setPreview(_post.image_url))
      }
    }, []);

    const changeContents = (e) => {
        setContents(e.target.value);
    }
    
    const changeValue = (e) => {
      setValue(e.target.value);
  }
  console.log(value)

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, value));
      };

    const editPost = () => {
      dispatch(postActions.editPostFB(post_id, {contents: contents}))
    }
    

      if (!is_login) {
        return (
          <Grid margin="100px 0px" padding="16px" center>
            <Text size="32px" bold>
              앗! 잠깐!
            </Text>
            <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
            <Button
              _onClick={() => {
                history.replace("/");
              }}
            >
              로그인 하러가기
            </Button>
          </Grid>
        );
      }

    return (
      <React.Fragment>
        <Grid padding="16px">
          <Text margin="0px" size="36px" bold>
            {is_edit ? "게시글 수정" : "게시글 작성"}
          </Text>
          <Upload />
        </Grid>


        {/* 오른쪽에 이미지 왼쪽에 텍스트 */}
        <Grid padding="16px">
          {/* 텍스트에는 패딩이 있고, 사진에는 없기 때문에 Grid 텍스트만 따로 감싸서 작성 */}
          <Grid>
            <input name="layout" type="radio" value="right-image" onClick={changeValue}/>
            오른쪽에 이미지 왼쪽에 텍스트
          </Grid>
          <Grid is_flex>
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
            <Grid width= "30vw">
            <Image
              shape="rectangle"
              src={
                preview
                  ? preview
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAANlBMVEXMzMzPz8+VlZWRkZHJycnGxsaWlpaZmZmqqqrExMSlpaWhoaHLy8uxsbG6urqenp64uLiurq4Z3VcBAAAFOElEQVR4nO2d6XLkKgyFAYNZzPr+L3slwEvPpDOpTJJyzz1fJd2WDcQ6RgL8gwgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjpTyifGJKh+rfzOkaaH5eePSX4znUClX91I6XaqYD9W/C2Ex/CXzqojaz8mqTuM5jQstYda3bCRxaSx9421/IeTt0MAotVq6c8+GvxpPqVyKPHf8vI0dRn4wvv3+vwJtpwZOFS9NUBsbgQ2/qfBe1VhUoCpJKW6gKdvr29HYMMq33/9X4NTaNTDWcvjyF3WDbkjfjaeYpVeRm6KUoMvKPYB0ydxKNzR9/ZQff0FWbusa5MX1E22pFB/TcMvhw57mL+k+Lxsfy7Q0KfzSOxAZia+E07g9do1dA0m+d4dIFCHdiGrKFW73ONm1h0xY91PD9/nN7vbzeQ3xNN4PpnvANzs02OYj9+smZJnJ0KvtGPhW1QS7uBzhYfIYEBzFgnTLGES8LVqGvTG7xZ9y5bOQw3FqYEdm5IQg5KqmoeyuAfUJSg4U7u2xCRmzoh5CrQxtdLFGlt2w9u4a8MOXhwa6n4tWsQbD0Ot6RL8uFBh5GRFxkN22Kur4hwakEmtg9sb0j3jyeSj19btnDdQyT9pFyEVNY10ODSTNGXKZgX6cTIviYVQcbgtq7hBUlOXmGoxxcGqw/kkDHgPtWh67gUw8HaRmXlQDGgooEjgWNH3ut01j+tuxwBluzgKvjUhNc+QQXzQWpFUbw1/pkhPXS0580CBuan3DJVobUBo8c6I6c6J5AQ0666ooL5xjY7mOjeUSC/VxFRT9HCVJG89jYy9Kc8vr2HjzcUFupbOqUtoxR6pjjlR/nSMR1GGUveSDbS6JyGV/nRa90hxJDno+uMyV03WuXE8NkrJ9fDyqh3mVlgpGnnPldp0r/zKbuCljXJjLnLlMemvNZArNA2g+dK4gqirc02ls2PS+ZhrLJDMMavP9xfddmBqMtTMtly9r53LpyhQshfLb9RRNGJqhtfPas8QLr50PDfTMkP3JmavR8WrhR0vrhXN4dKPU8FTPFJsvxot0g2N288u7tPXwpxPD0h+wCEs5Ur3eFn59Vvyo//AuzX7kXdxt2F8ISJ1cMrthLsYo9dv7A3a1ubb3Cxmpin/LeCXwbh0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+F9Rj49/lJjzHzYGk0HOj7MSV/E6E9r0YyP8ca1vXey52b5TY773VoyED9n1rUmPM/2YP/aDqUG3+o/QvKet87W1qlOJwth6iORSpavZJWrWBfoDy+03X/NJChe3kETKMsmaRQouyhZCTCFoUYPbugaOiuQkI++/pxsp0qLMpF5KiX4PDSrvZCgiNREd6UE6tBfQgDyj22zeJ7/FZnJ3tWXpG10kZ8zoB1TECKczJ4ZoQwiWNRAyeedd3jWQrW/EGrmjtOiM863eX4PikqCOnjw9sZydzJujXty0zIUO+InvsUBFcnIc3aMf6KlB3rI/NBgbzkXez9OREmnzL6BBIncqPUwjm9Oh0uPX3kt65qZpkwVF/YgFKqKF3uqZD3YNoo/cD7Q2ohodsqHwSslTjAShvUi318DwXossAqdyUSP/R5YURdZ8QB3bpDrGxsxF9NiNM3Ilyvec933f0ZS6SCMNM1dofLU2qtb3cfTmyZ++G9eR7xgj+oG8FNHpnWnCuVPjby3+S+R6+7EeAPAS/AeHcS6vbrevowAAAABJRU5ErkJggg=="
              }
            />
            </Grid>
          </Grid>
        </Grid>


        {/* 왼쪽에 이미지 오른쪽에 텍스트 */}
        <Grid padding="16px">
          {/* 텍스트에는 패딩이 있고, 사진에는 없기 때문에 Grid 텍스트만 따로 감싸서 작성 */}
          <Grid>
            <input name="layout" type="radio" value="left-image" onClick={changeValue}/>
            왼쪽에 이미지 오른쪽에 텍스트
          </Grid>
          <Grid is_flex>
            <Grid width= "30vw">
              <Image
                size=""
                shape="rectangle"
                src={
                  preview
                    ? preview
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAANlBMVEXMzMzPz8+VlZWRkZHJycnGxsaWlpaZmZmqqqrExMSlpaWhoaHLy8uxsbG6urqenp64uLiurq4Z3VcBAAAFOElEQVR4nO2d6XLkKgyFAYNZzPr+L3slwEvPpDOpTJJyzz1fJd2WDcQ6RgL8gwgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjpTyifGJKh+rfzOkaaH5eePSX4znUClX91I6XaqYD9W/C2Ex/CXzqojaz8mqTuM5jQstYda3bCRxaSx9421/IeTt0MAotVq6c8+GvxpPqVyKPHf8vI0dRn4wvv3+vwJtpwZOFS9NUBsbgQ2/qfBe1VhUoCpJKW6gKdvr29HYMMq33/9X4NTaNTDWcvjyF3WDbkjfjaeYpVeRm6KUoMvKPYB0ydxKNzR9/ZQff0FWbusa5MX1E22pFB/TcMvhw57mL+k+Lxsfy7Q0KfzSOxAZia+E07g9do1dA0m+d4dIFCHdiGrKFW73ONm1h0xY91PD9/nN7vbzeQ3xNN4PpnvANzs02OYj9+smZJnJ0KvtGPhW1QS7uBzhYfIYEBzFgnTLGES8LVqGvTG7xZ9y5bOQw3FqYEdm5IQg5KqmoeyuAfUJSg4U7u2xCRmzoh5CrQxtdLFGlt2w9u4a8MOXhwa6n4tWsQbD0Ot6RL8uFBh5GRFxkN22Kur4hwakEmtg9sb0j3jyeSj19btnDdQyT9pFyEVNY10ODSTNGXKZgX6cTIviYVQcbgtq7hBUlOXmGoxxcGqw/kkDHgPtWh67gUw8HaRmXlQDGgooEjgWNH3ut01j+tuxwBluzgKvjUhNc+QQXzQWpFUbw1/pkhPXS0580CBuan3DJVobUBo8c6I6c6J5AQ0666ooL5xjY7mOjeUSC/VxFRT9HCVJG89jYy9Kc8vr2HjzcUFupbOqUtoxR6pjjlR/nSMR1GGUveSDbS6JyGV/nRa90hxJDno+uMyV03WuXE8NkrJ9fDyqh3mVlgpGnnPldp0r/zKbuCljXJjLnLlMemvNZArNA2g+dK4gqirc02ls2PS+ZhrLJDMMavP9xfddmBqMtTMtly9r53LpyhQshfLb9RRNGJqhtfPas8QLr50PDfTMkP3JmavR8WrhR0vrhXN4dKPU8FTPFJsvxot0g2N288u7tPXwpxPD0h+wCEs5Ur3eFn59Vvyo//AuzX7kXdxt2F8ISJ1cMrthLsYo9dv7A3a1ubb3Cxmpin/LeCXwbh0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+F9Rj49/lJjzHzYGk0HOj7MSV/E6E9r0YyP8ca1vXey52b5TY773VoyED9n1rUmPM/2YP/aDqUG3+o/QvKet87W1qlOJwth6iORSpavZJWrWBfoDy+03X/NJChe3kETKMsmaRQouyhZCTCFoUYPbugaOiuQkI++/pxsp0qLMpF5KiX4PDSrvZCgiNREd6UE6tBfQgDyj22zeJ7/FZnJ3tWXpG10kZ8zoB1TECKczJ4ZoQwiWNRAyeedd3jWQrW/EGrmjtOiM863eX4PikqCOnjw9sZydzJujXty0zIUO+InvsUBFcnIc3aMf6KlB3rI/NBgbzkXez9OREmnzL6BBIncqPUwjm9Oh0uPX3kt65qZpkwVF/YgFKqKF3uqZD3YNoo/cD7Q2ohodsqHwSslTjAShvUi318DwXossAqdyUSP/R5YURdZ8QB3bpDrGxsxF9NiNM3Ilyvec933f0ZS6SCMNM1dofLU2qtb3cfTmyZ++G9eR7xgj+oG8FNHpnWnCuVPjby3+S+R6+7EeAPAS/AeHcS6vbrevowAAAABJRU5ErkJggg=="
                }
              />
            </Grid>
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
          </Grid>
        </Grid>


        {/* 하단에 이미지 상단에 텍스트 */}
        <Grid padding="16px">
          {/* 텍스트에는 패딩이 있고, 사진에는 없기 때문에 Grid 텍스트만 따로 감싸서 작성 */}
          <Grid>
            <input name="layout" type="radio" value="bottom-image" onClick={changeValue}/>
            하단에 이미지 상단에 텍스트
          </Grid>
          <Grid>
            <Text margin="0px" size="24px" bold>
              미리보기
            </Text>
            <Image
              shape="rectangle"
              src={
                preview
                  ? preview
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAANlBMVEXMzMzPz8+VlZWRkZHJycnGxsaWlpaZmZmqqqrExMSlpaWhoaHLy8uxsbG6urqenp64uLiurq4Z3VcBAAAFOElEQVR4nO2d6XLkKgyFAYNZzPr+L3slwEvPpDOpTJJyzz1fJd2WDcQ6RgL8gwgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAjpTyifGJKh+rfzOkaaH5eePSX4znUClX91I6XaqYD9W/C2Ex/CXzqojaz8mqTuM5jQstYda3bCRxaSx9421/IeTt0MAotVq6c8+GvxpPqVyKPHf8vI0dRn4wvv3+vwJtpwZOFS9NUBsbgQ2/qfBe1VhUoCpJKW6gKdvr29HYMMq33/9X4NTaNTDWcvjyF3WDbkjfjaeYpVeRm6KUoMvKPYB0ydxKNzR9/ZQff0FWbusa5MX1E22pFB/TcMvhw57mL+k+Lxsfy7Q0KfzSOxAZia+E07g9do1dA0m+d4dIFCHdiGrKFW73ONm1h0xY91PD9/nN7vbzeQ3xNN4PpnvANzs02OYj9+smZJnJ0KvtGPhW1QS7uBzhYfIYEBzFgnTLGES8LVqGvTG7xZ9y5bOQw3FqYEdm5IQg5KqmoeyuAfUJSg4U7u2xCRmzoh5CrQxtdLFGlt2w9u4a8MOXhwa6n4tWsQbD0Ot6RL8uFBh5GRFxkN22Kur4hwakEmtg9sb0j3jyeSj19btnDdQyT9pFyEVNY10ODSTNGXKZgX6cTIviYVQcbgtq7hBUlOXmGoxxcGqw/kkDHgPtWh67gUw8HaRmXlQDGgooEjgWNH3ut01j+tuxwBluzgKvjUhNc+QQXzQWpFUbw1/pkhPXS0580CBuan3DJVobUBo8c6I6c6J5AQ0666ooL5xjY7mOjeUSC/VxFRT9HCVJG89jYy9Kc8vr2HjzcUFupbOqUtoxR6pjjlR/nSMR1GGUveSDbS6JyGV/nRa90hxJDno+uMyV03WuXE8NkrJ9fDyqh3mVlgpGnnPldp0r/zKbuCljXJjLnLlMemvNZArNA2g+dK4gqirc02ls2PS+ZhrLJDMMavP9xfddmBqMtTMtly9r53LpyhQshfLb9RRNGJqhtfPas8QLr50PDfTMkP3JmavR8WrhR0vrhXN4dKPU8FTPFJsvxot0g2N288u7tPXwpxPD0h+wCEs5Ur3eFn59Vvyo//AuzX7kXdxt2F8ISJ1cMrthLsYo9dv7A3a1ubb3Cxmpin/LeCXwbh0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+F9Rj49/lJjzHzYGk0HOj7MSV/E6E9r0YyP8ca1vXey52b5TY773VoyED9n1rUmPM/2YP/aDqUG3+o/QvKet87W1qlOJwth6iORSpavZJWrWBfoDy+03X/NJChe3kETKMsmaRQouyhZCTCFoUYPbugaOiuQkI++/pxsp0qLMpF5KiX4PDSrvZCgiNREd6UE6tBfQgDyj22zeJ7/FZnJ3tWXpG10kZ8zoB1TECKczJ4ZoQwiWNRAyeedd3jWQrW/EGrmjtOiM863eX4PikqCOnjw9sZydzJujXty0zIUO+InvsUBFcnIc3aMf6KlB3rI/NBgbzkXez9OREmnzL6BBIncqPUwjm9Oh0uPX3kt65qZpkwVF/YgFKqKF3uqZD3YNoo/cD7Q2ohodsqHwSslTjAShvUi318DwXossAqdyUSP/R5YURdZ8QB3bpDrGxsxF9NiNM3Ilyvec933f0ZS6SCMNM1dofLU2qtb3cfTmyZ++G9eR7xgj+oG8FNHpnWnCuVPjby3+S+R6+7EeAPAS/AeHcS6vbrevowAAAABJRU5ErkJggg=="
              }
            />
          </Grid>
        </Grid>

        {/* 이미지 밑에 textarea */}
        <Grid padding="16px">
          <Input
            value={contents}
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="게시글 작성"
            multiLine
          />
        </Grid>

        {/*게시글 작성 마친 후 submit 위해 클릭하는 버튼 */}
        <Grid padding="16px">
          {is_edit ? (
            <Button text="게시글 수정" _onClick={editPost}></Button>
          ) : (
            <Button text="게시글 작성" _onClick={addPost}></Button>
          )}
        </Grid>
      </React.Fragment>
    );
}

export default PostWrite;