import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center, _onClick,  } = props;

  // 위에 props에서 스타일 속성끼리 묶기 위해 children만 뺀 것!
  const styles = {
      is_flex: is_flex,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
      center: center,
      
  };
  return (
    <React.Fragment>
      {/* 하위에 다른 컴포넌트 같이 쓰려면 children 써야 함 */}
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: null,
  center: false,
  _onClick: () => {}
};

// defaultProps를 가지고 스타일 어떻게 줄건지
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;  `
      : ""}
  // props가 center면 text-align을 center로 줌!
  ${(props) => props.center? `text-align: center`:''}
`;

export default Grid;
