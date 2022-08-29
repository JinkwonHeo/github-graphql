import { graphql } from 'babel-plugin-relay/macro';
import { Disposable, useMutation } from 'react-relay';

function useAddStarMutation(): Array<Disposable | boolean | any> {
  const [addStarMutation, isAddStarMutationInFlight] = useMutation(
    graphql`
      mutation useAddStarMutation($starrableId: ID!) {
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

  return [addStarMutation, isAddStarMutationInFlight];
}

export default useAddStarMutation;
