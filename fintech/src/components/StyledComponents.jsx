import React from "react";
import styled from "styled-components";

const BodyBlock = styled.div`
  color: rgb(255, 255, 255);
  background-color: rgb(247, 193, 193);
  text-shadow: rgb(122, 122, 122) 4px 3px 0px;
`;

const StyledComponents = () => {
  return (
    <div>
      <BodyBlock>바보 멍충이</BodyBlock>
    </div>
  );
};

export default StyledComponents;
