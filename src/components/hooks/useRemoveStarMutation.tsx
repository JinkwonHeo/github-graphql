import { graphql } from 'babel-plugin-relay/macro';
import { Disposable, useMutation } from 'react-relay';

function useRemoveStarMutation(): Array<Disposable | boolean | any> {
  const [removeStarMutation, isRemoveStarMutationInFlight] = useMutation(
    graphql`
      mutation useRemoveStarMutation($starrableId: ID!) {
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

  return [removeStarMutation, isRemoveStarMutationInFlight];
}

export default useRemoveStarMutation;
