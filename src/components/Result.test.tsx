import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RelayEnvironmentProvider, useLazyLoadQuery } from 'react-relay/hooks';
import ReactTestRenderer from 'react-test-renderer';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { graphql } from 'babel-plugin-relay/macro';

import Result from './Result';

describe('Test Relay Components', () => {
  test('Fragment', () => {
    const environment = createMockEnvironment();
    const TestRenderer = () => {
      const data: any = useLazyLoadQuery(
        graphql`
          query ResultTestQuery @relay_test_operation {
            searchedWord: node(id: "test-id") {
              ... on Repository {
                id
              }
            }
          }
        `,
        {}
      );

      return <Result searchedWord={data.searchedWord} setSearchedWord={data.setSearchedWord} />;
    };
    const renderer = ReactTestRenderer.create(
      <Router>
        <RelayEnvironmentProvider environment={environment}>
          <Suspense fallback="Loading...">
            <TestRenderer />
          </Suspense>
        </RelayEnvironmentProvider>
      </Router>
    );

    ReactTestRenderer.act(() => {
      environment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation)
      );
    });

    expect(renderer).toMatchSnapshot();
  });
});
