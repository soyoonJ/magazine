// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {
    // 쿠키 값을 가져옵니다.
    let value = "; " + document.cookie;
    // 키 값을 기준으로 파싱합니다.
    // ;으로만 자르지 않고, ${}=도 같이 포함해서 키 값도 같이 삭제한다.
    let parts = value.split(`; ${name}=`);
    // value를 return!
    if (parts.length === 2) {
          // pop을 써서 뒤에만 반환 -> split으로 한번 더 나누고 -> shift로 앞에만 반환
          return parts.pop().split(";").shift();
      }
  };
  
  // 쿠키에 저장하는 함수
  const setCookie = (name, value, exp = 5) => {
    let date = new Date();
    // 날짜를 만들어줍니다.
    // exp=5가 넣어져서, 5일간 유지한다는 의미가 됨
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    // 저장!
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };
  
  // 만료일을 예전으로 설정해 쿠키를 지웁니다.
  // user.js에서 deleteCookie에 "is_login"이 name으로 들어옴
  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';

    // let date = new Date("2020-01-01").toUTCString();
    // document.cookie = name + "=; expires=" + date;
  }



  
  export { getCookie, setCookie, deleteCookie };