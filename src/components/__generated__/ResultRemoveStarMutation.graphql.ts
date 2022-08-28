/**
 * @generated SignedSource<<4decc2a9a671cb8a787029741494a931>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResultRemoveStarMutation$variables = {
  starrableId: string;
};
export type ResultRemoveStarMutation$data = {
  readonly removeStar: {
    readonly starrable: {
      readonly id: string;
      readonly stargazerCount: number;
      readonly viewerHasStarred: boolean;
    } | null;
  } | null;
};
export type ResultRemoveStarMutation = {
  response: ResultRemoveStarMutation$data;
  variables: ResultRemoveStarMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "starrableId"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "starrableId",
        "variableName": "starrableId"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stargazerCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerHasStarred",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResultRemoveStarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveStarPayload",
        "kind": "LinkedField",
        "name": "removeStar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "starrable",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResultRemoveStarMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemoveStarPayload",
        "kind": "LinkedField",
        "name": "removeStar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "starrable",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a3fea0b449c206147e52d445b1640a91",
    "id": null,
    "metadata": {},
    "name": "ResultRemoveStarMutation",
    "operationKind": "mutation",
    "text": "mutation ResultRemoveStarMutation(\n  $starrableId: ID!\n) {\n  removeStar(input: {starrableId: $starrableId}) {\n    starrable {\n      __typename\n      id\n      stargazerCount\n      viewerHasStarred\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "81a574a9b8c664a63808d5b00be71635";

export default node;
