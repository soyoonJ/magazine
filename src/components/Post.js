// PostList(메인_목록페이지)에 나오는 카드 한 덩이

import React from "react";
import { Grid, Image, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

const Post = (props) => {
  const dispatch = useDispatch();
  // const layout = useSelector((state) => state.post.list);
  // console.log(layout)
  console.log(typeof props.value);


    switch(props.value) {
      case 'right-image' :
        // e.stopPropagation() : 부모요소 삭제 안되도록 함
        return (
        <React.Fragment>
          <Grid>
            <Grid is_flex padding="16px">
              <Grid is_flex width="auto">
                <Image shape="circle" src={props.src} />
                <Text bold>{props.user_info.user_name}</Text>
              </Grid>
              <Grid is_flex width="auto">
                {/* 게시일자 */}
                <Text>{props.insert_dt}</Text>
                {/* 수정하기 버튼 */}
                {props.is_me && (
                  <Button
                    width="auto"
                    // 작성시간이랑 버튼 사이 간격
                    margin="4px"
                    padding="4px"
                    _onClick={(e) => {
                      e.stopPropagation()
                      history.push(`/write/${props.id}`);
                    }}
                  >
                    수정
                  </Button>
                )}
                {/* 삭제하기 버튼 */}
                {props.is_me && (
                  <Button
                    width="auto"
                    margin="4px"
                    padding="4px"
                    _onClick={(e) => {
                      e.stopPropagation()
                      dispatch(postActions.deletePostFB(props.id));
                    }}
                  >
                    삭제
                  </Button>
                )}
              </Grid>
            </Grid>
  
            <Grid is_flex>
              <Text margin="0px" size="24px" bold>
                {props.contents}
              </Text>
            <Grid width="30vw">
              {/* 게시물 목록에서 노출되는 사진 부분 */}
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
            </Grid>
  

            <Grid padding="16px">
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </Grid>
        </React.Fragment>
        )
     
        case 'left-image' :
          return (
        <React.Fragment>
          <Grid>
            <Grid is_flex padding="16px">
              <Grid is_flex width="auto">
                <Image shape="circle" src={props.src} />
                <Text bold>{props.user_info.user_name}</Text>
              </Grid>
              <Grid is_flex width="auto">
                {/* 게시일자 */}
                <Text>{props.insert_dt}</Text>
                {/* 수정하기 버튼 */}
                {props.is_me && (
                  <Button
                    width="auto"
                    margin="4px"
                    padding="4px"
                    _onClick={(e) => {
                      e.stopPropagation()
                      history.push(`/write/${props.id}`);
                    }}
                  >
                    수정
                  </Button>
                )}
                {/* 삭제하기 버튼 */}
                {props.is_me && (
                  <Button
                    width="auto"
                    margin="4px"
                    padding="4px"
                    _onClick={(e) => {
                      e.stopPropagation()
                      dispatch(postActions.deletePostFB(props.id));
                    }}
                  >
                    삭제
                  </Button>
                )}
              </Grid>
            </Grid>
  
            <Grid is_flex>
              <Grid width="30vw">
                <Image size="" shape="rectangle" src={props.image_url} />
              </Grid>
              <Text margin="0px" size="24px" bold>
                {props.contents}
              </Text>
            </Grid>
  
            <Grid padding="16px">
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </Grid>
        </React.Fragment>
          )

        case 'bottom-image' :
          return (
        <React.Fragment>
          <Grid>
            <Grid is_flex padding="16px">
              <Grid is_flex width="auto">
                <Image shape="circle" src={props.src} />
                <Text bold>{props.user_info.user_name}</Text>
              </Grid>
              <Grid is_flex width="auto">
                {/* 게시일자 */}
                <Text>{props.insert_dt}</Text>
                {/* 수정하기 버튼 */}
                {props.is_me && (
                  <Button
                    width="auto"
                    margin="4px"
                    padding="4px"
                    _onClick={(e) => {
                      e.stopPropagation()
                      history.push(`/write/${props.id}`);
                    }}
                  >
                    수정
                  </Button>
                )}
                {/* 삭제하기 버튼 */}
                {props.is_me && (
                  <Button
                    width="auto"
                    margin="4px"
                    padding="4px"
                    _onClick={(e) => {
                      e.stopPropagation()
                      dispatch(postActions.deletePostFB(props.id));
                    }}
                  >
                    삭제
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid padding="16px">
              <Text>{props.contents}</Text>
            </Grid>
            <Grid>
              {/* 게시물 목록에서 노출되는 사진 부분 */}
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
            <Grid padding="16px">
              <Text margin="0px" bold>
                댓글 {props.comment_cnt}개
              </Text>
            </Grid>
          </Grid>
        </React.Fragment>
          )

        default :
        return null;
    }
      


};

// Post에 들어가야할 정보의 defaultProps값 설정
Post.defaultProps = {
  user_info: {
    user_name: "soyoon",
    user_profile:
      "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
  },
  image_url:
    "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
