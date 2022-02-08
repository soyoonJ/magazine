// 로그인이랑 회원가입에서 둘 다 사용하기 때문에 따로 컴포넌트로 빼서 사용

export const emailCheck = (email) => {

    // aa_-.123Aaa@aa.com
    // 첫글자 숫자/영대소문자, 뒤에 특수문자/숫자/영대소문자 여러번 반복 가능
    // /^ 첫글자, ()* 여러번 반복될 수 있다, 
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

    // 유효성 체크하는 방법!! 맞으면 true, 아니면 false 반환
    return _reg.test(email);
}

    
