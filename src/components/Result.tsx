import React, { Fragment, useState, useEffect, SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { useLazyLoadQuery, useMutation } from 'react-relay';
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
      searchedWord: string;
    };
  };
  setCursor: Dispatch<SetStateAction<string>>;
}) {
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
                viewerHasStarred
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

  const [addStarMutation, isAddStarMutationInFlight] = useMutation(
    graphql`
      mutation ResultAddStarMutation($starrableId: ID!) {
        addStar(input: { starrableId: $starrableId }) {
          starrable {
            id
            stargazerCount
            ... on Repository {
              id
            }
            viewerHasStarred
          }
        }
      }
    `
  );

  const [removeStarMutation] = useMutation(
    graphql`
      mutation ResultRemoveStarMutation($starrableId: ID!) {
        removeStar(input: { starrableId: $starrableId }) {
          starrable {
            id
            stargazerCount
            viewerHasStarred
          }
        }
      }
    `
  );

  useEffect(() => {
    setCursor(data.search.pageInfo.endCursor);
  }, [queryArgs.options.fetchKey]);

  const handleMutationStar = (id: string, hasStarred: boolean) => {
    if (hasStarred) {
      removeStarMutation({
        variables: {
          starrableId: id,
        },
      });
    } else {
      addStarMutation({
        variables: {
          starrableId: id,
        },
      });
    }
  };

  return (
    <div>
      <div>Total result: {data.search.repositoryCount}</div>
      {data.search?.edges.map((item: any) => (
        <Fragment key={item?.node?.id}>
          <RepositoryElementContainer>
            <div>{item?.node?.name}</div>
            <div>{item?.node?.description}</div>
            <div>starred?: {item?.node?.viewerHasStarred ? 'yes' : 'no'}</div>
            <button
              disabled={isAddStarMutationInFlight}
              onClick={() => handleMutationStar(item.node.id, item?.node?.viewerHasStarred)}
            >
              {item?.node?.stargazerCount}
            </button>
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
