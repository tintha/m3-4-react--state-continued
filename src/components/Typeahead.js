import React, {useState} from 'react';
import Styled from 'styled-components'

const Typeahead = (props) => {
    const {suggestions, categories, handleSelect} = props;
    const [userInput, setUserInput] = useState("");
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
    const [isSelected, setIsSelected] = useState(false);
    
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
                      handleSelect(e.target.value);
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
                <Ul>
                    {filtered.length === 0 ? null :
                    filtered.map((book, index) => {
                      const userPart = userInput.toLowerCase();
                      const theBook = book.title.toLowerCase();
                      const firstIndexOf = theBook.indexOf(userPart);
                      const firstHalf = book.title.slice(0, firstIndexOf+userInput.length);
                      const secondHalf = book.title.slice(userInput.length+firstIndexOf);
                      const catTitle = categories[book.categoryId].name;
                    return <Li
                              key={book.id} 
                              onClick={() => handleSelect(book.title)}
                              onMouseEnter={() => setIsSelected(!isSelected)} 
                              style={{
                                background: isSelected ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent',
                              }}
                            >
                              <span>{firstHalf}<Prediction>{secondHalf}</Prediction></span>
                              <Cat>{catTitle}</Cat>
                            </Li>
                    })}
                </Ul>
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

const Ul = Styled.ul`
    position: absolute;
    top: 3.5rem;
    border 1px solid #b8b8b8;
    border-radius: 4px;
   
`;

const Li = Styled.li`
  line-height: 22px;
  padding: 10px;
`;

const Input = Styled.input`
    border: 1px solid #b8b8b8;
    width: 300px;
    border-radius: 4px;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
`;

const Prediction = Styled.span`
    font-weight: bold;
`;

const Cat = Styled.p`
    color: purple;
    font-style: italic;
    font-size: 0.8rem;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
`;

export default Typeahead;