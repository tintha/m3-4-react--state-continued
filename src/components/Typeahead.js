import React, {useState} from 'react';
import Styled from 'styled-components'
import Suggestion from './Suggestion';

const Typeahead = (props) => {
    const {suggestions, categories, handleSelect} = props;
    const [userInput, setUserInput] = useState("");
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
    
    const filtered = suggestions.filter((book) => 
        book.title.toLowerCase().match(userInput.toLowerCase()) &&
        userInput !== "" && userInput.length >= 2);

    return <>
              <Input 
                value={userInput}
                type="text" 
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  switch (e.key) {
                    case "Enter": {
                      handleSelect(filtered[selectedSuggestionIndex].title);
                      return;
                    }
                    case "ArrowUp": {
                      setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                      return;
                    }
                    case "ArrowDown": {
                      setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                      return;
                    }
                  }
                }}
                />
                <ClearButton onClick={() => setUserInput("")}>
                    Clear
                </ClearButton>
                <Wrapper>
                    {filtered.length >= 1 && 
                    filtered.map((book, index) => {
                      const isSelected = index === selectedSuggestionIndex;
                      const userPart = userInput.toLowerCase();
                      const theBook = book.title.toLowerCase();
                      const firstIndexOf = theBook.indexOf(userPart);
                      const firstHalf = book.title.slice(0, firstIndexOf+userInput.length);
                      const secondHalf = book.title.slice(userInput.length+firstIndexOf);
                      const catTitle = categories[book.categoryId].name;
                    return <Suggestion
                              key={book.id} 
                              firstHalf={firstHalf}
                              secondHalf={secondHalf}
                              category={catTitle}
                              isSelected={isSelected}
                              onClickFunc={() => handleSelect(book.title)}
                              onMouseEnter={() => setSelectedSuggestionIndex(index)}
                            />
                    })
                    }
                </Wrapper>  
                
            </>
}

const ClearButton = Styled.button`
    border-radius: 4px;
    border: 1px solid #b8b8b8;
    background-color: #0902d1;
    color: #fff;
    margin-left: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    padding: 10px;
`;

const Wrapper = Styled.ul`
    position: absolute;
    width: 350px;
    top: 3.5rem;
    border-radius: 4px;
    -webkit-box-shadow: 1px 5px 18px -3px rgba(0,0,0,0.81); 
    box-shadow: 1px 5px 18px -3px rgba(0,0,0,0.81);
`;

const Input = Styled.input`
    border: 1px solid #b8b8b8;
    width: 350px;
    border-radius: 4px;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
`;

export default Typeahead;