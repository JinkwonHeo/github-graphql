import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import RelayEnvironment from './RelayEnvironment';
import Search from './components/Search';
import Result from './components/Result';

function App() {
  const [cursor, setCursor] = useState<any>(undefined);
  const [searchedWord, setSearchedWord] = useState<string>('');
  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: { endCursor: cursor, searchedWord },
  });

  useEffect(() => {
    setQueryArgs((prev) => ({
      options: {
        fetchKey: prev?.options.fetchKey ?? 0,
      },
      variables: { endCursor: cursor, searchedWord },
    }));
  }, []);

  const refetch = useCallback(() => {
    setQueryArgs((prev) => ({
      options: {
        fetchKey: (prev?.options.fetchKey ?? 0) + 1,
      },
      variables: { endCursor: cursor, searchedWord },
    }));
  }, [cursor]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Search
              searchedWord={searchedWord}
              setSearchedWord={setSearchedWord}
              setQueryArgs={setQueryArgs}
            />
          }
        />
        <Route
          path="/result/:searchedWord"
          element={<Result refetch={refetch} queryArgs={queryArgs} setCursor={setCursor} />}
        />
      </Routes>
    </>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
