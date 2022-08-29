import React, { Fragment, useEffect, SetStateAction, Dispatch } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';

import { Button } from './share/Button';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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
  const navigate = useNavigate();
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

  const [removeStarMutation, isRemoveStarMutationInFlight] = useMutation(
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

  const handleNavigateToMainPage = () => {
    navigate(`/`);
  };

  return (
    <ResultContainer>
      <ResultHeader>
        <RepositoryTotalCount>Total result: {data.search.repositoryCount}</RepositoryTotalCount>
        <MoreButton onClick={handleNavigateToMainPage}>첫 화면으로 돌아가기</MoreButton>
      </ResultHeader>
      <ResultItemContainer>
        {data.search?.edges.map((item: any) => (
          <Fragment key={item?.node?.id}>
            <RepositoryTitle>{item?.node?.name}</RepositoryTitle>
            <RepositoryDescription>{item?.node?.description}</RepositoryDescription>
            <RepositoryStarButton
              disabled={isAddStarMutationInFlight || isRemoveStarMutationInFlight}
              onClick={() => handleMutationStar(item.node.id, item?.node?.viewerHasStarred)}
            >
              {item?.node?.viewerHasStarred ? (
                <AiFillStar
                  color="yellow"
                  size={17}
                  stroke="#646464"
                  strokeWidth={50}
                  strokeLinejoin="round"
                />
              ) : (
                <AiOutlineStar size={18} strokeLinejoin="round" />
              )}
              {item?.node?.stargazerCount}
            </RepositoryStarButton>
          </Fragment>
        ))}
      </ResultItemContainer>
      {data.search.pageInfo.hasNextPage ? (
        <>
          <MoreButton onClick={() => refetch()}>더 보기</MoreButton>
        </>
      ) : (
        'End of list'
      )}
    </ResultContainer>
  );
}

export default Result;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 50rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
  }
`;

const ResultItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 25rem;
  }
`;

const RepositoryTotalCount = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
`;

const RepositoryTitle = styled.div`
  margin-top: 1.2rem;
  font-size: 1.6rem;
  font-weight: bolder;
`;

const RepositoryDescription = styled.div`
  margin-top: 0.5rem;
`;

const RepositoryStarButton = styled(Button)``;
const MoreButton = styled(Button)``;
