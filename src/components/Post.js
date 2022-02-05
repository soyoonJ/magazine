import React from "react";
// import Grid from "../elements/Grid";
// import Image from "../elements/Image";
// import Text from "../elements/Text";

import {Grid, Image, Text} from "../elements";


const Post = (props) => {

    return (
      <React.Fragment>
        <Grid>
          <Grid is_flex padding="16px">
            <Grid is_flex width="auto">
              <Image shape="circle" src={props.src} />
              <Text bold>{props.user_info.user_name}</Text>
            </Grid>
            <Grid is_flex width="auto">
              <Text>{props.insert_dt}</Text>
            </Grid>
          </Grid>
          <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.image_url} />
          </Grid>
          <Grid padding="16px">
            <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}

Post.defaultProps = {
  user_info: {
    user_name: "soyoon",
    user_profile: "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
  },
  image_url: "https://photo.jtbc.joins.com/news/2021/03/26/202103261532034842.jpg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
};

export default Post;