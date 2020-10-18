import React from 'react';
import data from '../data';
import GlobalStyles from './GlobalStyles';
import Styled from 'styled-components';
import Typeahead from './Typeahead';

const Wrapper = Styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
      <Typeahead
        categories={data.categories}
        suggestions={data.books}
        handleSelect={(suggestions => {
          window.alert(suggestions)
        })}
        />
      </Wrapper>
    </>
  );
};

export default App;
