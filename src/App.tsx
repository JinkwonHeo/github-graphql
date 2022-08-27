import React, { Fragment, Suspense } from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { RelayEnvironmentProvider, loadQuery, usePreloadedQuery } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';
import styled from 'styled-components';

const RepositoryQuery = graphql`
  query AppRepositoryListQuery {
    search(query: "react", first: 5, type: REPOSITORY) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryQuery, {});

function App(props: any) {
  const data: any = usePreloadedQuery(RepositoryQuery, props.preloadedQuery);

  console.log(data);
  return (
    <div className="App">
      {data.search.edges.map((element: any) => (
        <Fragment key={element.node.id}>
          <RepositoryElementContainer>
            <div>{element.node.name}</div>
            <div>{element.node.description}</div>
            <div>{element.node.stargazerCount}</div>
          </RepositoryElementContainer>
        </Fragment>
      ))}
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;

const RepositoryElementContainer = styled.div`
  padding: 20px;
`;
