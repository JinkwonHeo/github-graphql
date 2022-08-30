/**
 * @generated SignedSource<<092ac5cbf0362900ec694cf6718440ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ResultTestQuery$variables = {};
export type ResultTestQuery$data = {
  readonly searchedWord: {
    readonly id?: string;
  } | null;
};
export type ResultTestQuery = {
  response: ResultTestQuery$data;
  variables: ResultTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ResultTestQuery",
    "selections": [
      {
        "alias": "searchedWord",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/)
            ],
            "type": "Repository",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"test-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ResultTestQuery",
    "selections": [
      {
        "alias": "searchedWord",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "node(id:\"test-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "f770cda70eaf85380196e4fbdce73f60",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "searchedWord": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Node"
        },
        "searchedWord.__typename": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "searchedWord.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "ResultTestQuery",
    "operationKind": "query",
    "text": "query ResultTestQuery {\n  searchedWord: node(id: \"test-id\") {\n    __typename\n    ... on Repository {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c11f8bfc139525a57881ee16339d66ad";

export default node;
