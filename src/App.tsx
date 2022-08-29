import React, { Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './config/RelayEnvironment';

import Search from './components/Search';
import Result from './components/Result';

import styled, { ThemeProvider } from 'styled-components';
import { Oval } from 'react-loader-spinner';
import theme from './style/theme';

function App() {
  const [searchedWord, setSearchedWord] = useState<string>('');

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Search searchedWord={searchedWord} setSearchedWord={setSearchedWord} />}
        />
        <Route
          path="/result/:searchedWord"
          element={
            <Suspense
              fallback={
                <LoaderWrapper>
                  <Oval
                    height={70}
                    width={70}
                    color="#3cb46e"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#3cb46e"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </LoaderWrapper>
              }
            >
              <Result searchedWord={searchedWord} />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
