import React, { Fragment, useState, useEffect, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'babel-plugin-relay/macro';

function Result({
  refetch,
  queryArgs,
  setCursor,
}: {
  refetch: any;
  queryArgs: {
    options: {
      fetchKey: number;
    };
    variables: {
      endCursor: string;
    };
  };
  setCursor: Dispatch<SetStateAction<string>>;
}) {
  const [searchedLists, setSearchedLists] = useState<any[]>([]);
  const data: any = useLazyLoadQuery(
    graphql`
      query ResultQuery($endCursor: String, $searchedWord: String!) {
        search(query: $searchedWord, first: 5, after: $endCursor, type: REPOSITORY) {
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
    `,
    queryArgs.variables,
    queryArgs.options
  );

  useEffect(() => {
    setCursor(data.search.pageInfo.endCursor);
    setSearchedLists((prev) => prev.concat(...data.search.edges));
  }, [queryArgs.options.fetchKey]);

  return (
    <div>
      <div>Total result: {data.search.repositoryCount}</div>
      {searchedLists.map((item: any) => (
        <Fragment key={item?.node?.id}>
          <RepositoryElementContainer>
            <div>{item?.node?.name}</div>
            <div>{item?.node?.description}</div>
            <div>{item?.node?.stargazerCount}</div>
          </RepositoryElementContainer>
        </Fragment>
      ))}
      {data.search.pageInfo.hasNextPage ? (
        <button onClick={() => refetch()}>더 보기</button>
      ) : (
        'End of list'
      )}
    </div>
  );
}

export default Result;

const RepositoryElementContainer = styled.div`
  padding: 20px;
`;
