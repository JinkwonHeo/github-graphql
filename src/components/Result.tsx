import React, { Fragment, useEffect, SetStateAction, Dispatch } from 'react';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { graphql } from 'babel-plugin-relay/macro';

import useAddStarMutation from './hooks/useAddStarMutation';
import useRemoveStarMutation from './hooks/useRemoveStarMutation';

import ToTopButton from './ToTopButton';
import { Button } from './share/Button';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Oval } from 'react-loader-spinner';

function Result({
  searchedWord,
  setSearchedWord,
}: {
  searchedWord: string;
  setSearchedWord: Dispatch<SetStateAction<string>>;
}) {
  const [addStarMutation, isAddStarMutationInFlight] = useAddStarMutation();
  const [removeStarMutation, isRemoveStarMutationInFlight] = useRemoveStarMutation();
  const navigate = useNavigate();

  const queryData: any = useLazyLoadQuery(
    graphql`
      query ResultQuery($searchedWord: String!) {
        ...Result_result @arguments(searchedWord: $searchedWord)
      }
    `,
    { searchedWord }
  );

  const { data, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment Result_result on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 5 }
        searchedWord: { type: "String!" }
        after: { type: "String" }
      )
      @refetchable(queryName: "ResultPaginationQuery") {
        search(query: $searchedWord, first: $first, after: $after, type: REPOSITORY)
          @connection(key: "Repository_search") {
          repositoryCount
          edges {
            node {
              ... on Repository {
                id
                name
                description
                stargazerCount
                viewerHasStarred
                url
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
    queryData
  );

  useEffect(() => {
    return () => setSearchedWord('');
  }, []);

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

  interface IItem {
    node: INode;
  }

  interface INode {
    id: string;
    name: string;
    url: string;
    description: string;
    viewerHasStarred: boolean;
    stargazerCount: number;
  }

  return (
    <>
      <ToTopButton />
      <ResultContainer>
        <ResultHeader>
          <RepositoryTotalCount>Total result: {data.search.repositoryCount}</RepositoryTotalCount>
          <MainPageButton onClick={handleNavigateToMainPage}>처음 화면으로 돌아가기</MainPageButton>
        </ResultHeader>
        <ResultItemContainer>
          {data.search?.edges.map((item: IItem) => (
            <Fragment key={item?.node?.id}>
              <RepositoryTitle>{item?.node?.name}</RepositoryTitle>
              <RepositoryDescription
                href={item?.node?.url as string}
                target="_blank"
                rel="noreferrer"
              >
                {item?.node?.description}
              </RepositoryDescription>
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
            {isLoadingNext ? (
              <LoaderWrapper>
                <Oval
                  height={30}
                  width={30}
                  color="#3cb46e"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#3cb46e"
                  strokeWidth={5}
                  strokeWidthSecondary={5}
                />
              </LoaderWrapper>
            ) : (
              <MoreButton onClick={() => loadNext(5)}>더 보기</MoreButton>
            )}
          </>
        ) : (
          'End of list'
        )}
      </ResultContainer>
    </>
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RepositoryDescription = styled.a`
  width: fit-content;
  margin-top: 0.5rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    text-decoration: underline;
  }
`;

const RepositoryStarButton = styled(Button)``;
const MainPageButton = styled(Button)``;
const MoreButton = styled(Button)`
  margin-bottom: 2rem;
`;

const LoaderWrapper = styled.div`
  margin-bottom: 2rem;
`;
