import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchedWord, setSearchedWord] = useState<string>('');

  const navigate = useNavigate();

  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.persist();

    const word = e.currentTarget.value;
    setSearchedWord(word);
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    navigate(`/result/${searchedWord}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>this is Search component</div>
        <input
          id="searchedWord"
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
