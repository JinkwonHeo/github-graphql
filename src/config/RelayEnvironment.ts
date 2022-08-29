import { Environment, Network, RecordSource, Store, Variables } from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

async function fetchRelay(params: any, variables: Variables) {
  return fetchGraphQL(params.text, variables);
}

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
