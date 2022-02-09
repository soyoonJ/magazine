import React from "react";

import { Button } from "../elements";
// import { getStorage, ref } from "firebase/storage";
// 이미지 저장해두는 storage import
import { storage } from "./firebase";
import {useSelector, useDispatch} from "react-redux";

import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const fileInput = React.useRef();
    const is_uploading = useSelector(state => state.image.uploading);

    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        // e.target.files랑 ref로 잡아준 fileInput.current.files랑 콘솔 값이 같아야 함
        console.log(e.target.files[0]);
        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        // 파일 내용 읽어오기
        reader.readAsDataURL(file);
        // 읽기가 끝나면 발생하는 이벤트 핸들러
        reader.onloadend = () => {
            console.log(reader.result);
            // 프리뷰에 보내주기
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    const uploadFB = () => {
        let image = fileInput.current?.files[0];
        // firebase > 웹 > 파일업로드에서 올리는 방법 찾을 수 있음
        // 파이어베이스 storage에 images/ 폴더 만들어 둔 곳에 있는 이미지 이름
        // .put()을 사용하면 파이어베이스에 올릴 수 있음. 괄호 안에 image 넣었기 때문에 이미지 업로드 됨
        const _upload = storage.ref(`images/${image.name}`).put(image);
  
        // 업로드!
        _upload.then((snapshot) => {
          console.log(snapshot);

          // firebase > 웹 > 파일업로드에서 올리는 방법 찾을 수 있음
          snapshot.ref.getDownloadURL().then((url)=> {
              console.log(url);
          });
        });
  
    }

    return (
    <React.Fragment>
      {/* 변화가 있을 때 selectFile 함수로 넘어가기 */}
      <input type="file" ref={fileInput} onChange={selectFile} disabled={is_uploading}/>
      <Button _onClick={uploadFB}>업로드하기</Button>
    </React.Fragment>
  );
};

export default Upload;