export const emailCheck = (email) => {

    // aa_-.123Aaa@aa.com
    // 첫글자 숫자/영대소문자, 뒤에 특수문자/숫자/영대소문자 여러번 반복 가능
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

    return _reg.test(email);
}

    
