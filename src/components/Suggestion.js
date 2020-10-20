import React from 'react';
import Styled from 'styled-components';

const Suggestion = (props) => {
  const { firstHalf, secondHalf, category, onClickFunc, isSelected, onMouseEnter } = props
  return (<Li onClick={onClickFunc} isSelected={isSelected} onMouseEnter={onMouseEnter}>
    <span>{firstHalf}</span>
    <Prediction>{secondHalf}</Prediction>
    <Category><InSpan>in </InSpan>{category}</Category>
  </Li>
  );
}

const Li = Styled.li`
  line-height: 22px;
  padding: 10px;
  background-color: ${(props) => (props.isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent')};
`;
const Prediction = Styled.span`
    font-weight: bold;
`;
const InSpan = Styled.span`
    font-weight: bold;
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-style: italic;
    font-size: 0.8rem;
`;

const Category = Styled.p`
    color: purple;
    font-style: italic;
    font-size: 0.9rem;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
`;
export default Suggestion;