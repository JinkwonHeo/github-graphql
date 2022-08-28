import React, { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function Search({
  searchedWord,
  setSearchedWord,
  setQueryArgs,
}: {
  searchedWord: string;
  setSearchedWord: Dispatch<SetStateAction<string>>;
  setQueryArgs: Dispatch<SetStateAction<any>>;
}) {
  const navigate = useNavigate();

  const handleChange = debounce((e: React.BaseSyntheticEvent) => {
    setSearchedWord(e.target.value);
  }, 200);

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setQueryArgs({
      options: {
        fetchKey: 0,
      },
      variables: { endCursor: undefined, searchedWord },
    });
    navigate(`/result/${searchedWord}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoCapitalize="off"
        />
        <button>Search</button>
      </form>
    </>
  );
}

export default Search;
