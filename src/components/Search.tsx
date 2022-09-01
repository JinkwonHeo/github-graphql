import React, { SetStateAction, Dispatch, useDeferredValue, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import githubImage from './assets/github_graphql.png';

function Search({
  searchedWord,
  setSearchedWord,
}: {
  searchedWord: string;
  setSearchedWord: Dispatch<SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const deferredSearchedWord = useDeferredValue(input);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setSearchedWord(deferredSearchedWord);
    navigate(`/result/${input}`);
  };

  return (
    <>
      <Container>
        <Image src={githubImage} alt="github_graphql_image" />
        <SearchForm onSubmit={handleSubmit}>
          <InputWrapper>
            <SearchInput
              type="text"
              placeholder="Type the repository name"
              onChange={handleChange}
              autoFocus={true}
              autoComplete="off"
              autoCapitalize="off"
            />
          </InputWrapper>
          <Button disabled={!input.length}>Search</Button>
        </SearchForm>
      </Container>
    </>
  );
}

export default Search;

const Container = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 98vh;
`;

const Image = styled.img`
  width: 40rem;
`;

const SearchForm = styled.form`
  ${({ theme }) => theme.common.flexCenterColumn};
`;

const InputWrapper = styled.div`
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 10%), 0px 2px 5px -2px rgba(0, 0, 0, 0.418),
    0px 2px 5px -7px rgb(0 0 0 / 10%);
`;

const SearchInput = styled.input`
  width: 15rem;
  padding: 0.7rem;
  font-size: 1rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.green};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  margin: 1rem;
  transition-duration: 0.4s;
  background: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 10%), 0px 2px 5px -2px rgba(0, 0, 0, 0.418),
    0px 2px 5px -7px rgb(0 0 0 / 10%);
  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  }
  cursor: pointer;
`;
