// import React from "react";
// import _ from "lodash";

// const Search = () => {

//     const [text, setText] = React.useState('');

//     // 기다렸다가 입력한 값이 뜸
//     const debounce = _.debounce((e)=> {
//         console.log("debounce ::: ", e.target.value);
//     }, 1000);

//     // 값이 계속해서 나옴 (but onChange와는 다르게 일정 텀을 두고 반영 됨)
//     const throttle = _.throttle((e)=>{
//         console.log("throttle ::: ",e.target.value);
//     }, 1000);


//     const keyPress = React.useCallback();

//     const onChange = (e) => {
//         setText(e.target.value);
//         keyPress(e);
//         // onChange에 debounce를 주면 debounce가 안 먹음
//         // 이렇게 함수에다가 넣으면 엉망진창으로 동작함 (throttle도 마찬가지)
//         // debounce(e);
//     }


    
//     return (
//         <div>
//             <input type="text" onChange={onChange}/>
//         </div>
//     )
// }

// export default Search;