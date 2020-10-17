import React, {useState} from 'react';
import Styled from 'styled-components'
import { categories } from '../data';

const Wrapper = Styled.div`
    display: flex;
    
`;
const FormWrapper = Styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`;

const Input = Styled.input`
    border: 1px solid #b8b8b8;
    width: 300px;
    border-radius: 4px;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
`;

const ClearButton = Styled.button`
    border-radius: 4px;
    border: 1px solid #b8b8b8;
    background-color: #0902d1;
    color: #fff;
    margin-left: 10px;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
`;

const Li = Styled.li`

    &:hover {
        background-color: yellow;
    }
`;

const Ul = Styled.ul`
    position: absolute;
    top: 70px;
   
`;

const Prediction = Styled.span`
    font-weight: bold;
`;

const Cat = Styled.p`
    color: purple;
    font-style: italic;
`;

const Typeahead = (props) => {
    const {suggestions, handleSelect} = props;
    const [userInput, setUserInput] = useState("");
    
    const filtered = suggestions.filter((book) => 
        book.title.toLowerCase().match(userInput.toLowerCase()) &&
        userInput !== ""
    );
    

    return <>
    <div>
        <FormWrapper>
                <Input 
                    type="text" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSelect(e.target.value);
                        }
                    }} >
                </Input>
                
                <ClearButton onClick={() => setUserInput("")}>
                    Clear
                </ClearButton>
                </FormWrapper>
                <Wrapper>
                <Ul>
                    {filtered.length === 0 ? null :

                    filtered.map((book) => {
                        let userPart = userInput.toLowerCase();
                        let theBook = book.title.toLowerCase();
                        let firstIndexOf = theBook.indexOf(userPart);
                        let firstHalf = book.title.slice(0, firstIndexOf+userInput.length);
                        let secondHalf = book.title.slice(userInput.length+firstIndexOf);
                        let catTitle = categories[book.categoryId].name;
                        console.log(catTitle);
                    return <Li key={book.id} onClick={() => handleSelect(book.title)}><span>{firstHalf}<Prediction>{secondHalf}</Prediction></span><Cat>{catTitle}</Cat></Li>
                    })}
                </Ul>
                </Wrapper>
                </div>
            </>
}

export default Typeahead;