import React, { SetStateAction, Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function Search({
  searchedWord,
  setSearchedWord,
}: {
  searchedWord: string;
  setSearchedWord: Dispatch<SetStateAction<string>>;
}) {
  const navigate = useNavigate();

  const handleChange = debounce((e: React.BaseSyntheticEvent) => {
    e.persist();
    setSearchedWord(e.target.value);
  }, 250);

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    navigate(`/result/${searchedWord}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>this is Search component</div>
        <input
          id="input"
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoCapitalize="off"
        />
        <button>to result component</button>
      </form>
    </>
  );
}

export default Search;
