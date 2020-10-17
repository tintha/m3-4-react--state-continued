import React, {useState} from 'react';
import Styled from 'styled-components'

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

const Typeahead = (props) => {
    const {suggestions, handleSelect} = props;
    const [userInput, setUserInput] = useState("");
    const filtered = suggestions.filter((book) => book.title.toLowerCase().match(userInput.toLowerCase()) &&
        userInput !== "");
    console.log(filtered.length);
  

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
                        return <Li key={book.id} onClick={() => handleSelect(book.title)}>{book.title}</Li>
                    })}
                </Ul>
                </Wrapper>
                </div>
            </>
}

export default Typeahead;