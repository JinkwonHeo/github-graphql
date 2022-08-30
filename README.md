# Relay-GraphQL

Relay를 이용한 GitHub GraphQL API Query 프로젝트

<br>

## 목차

- [설치 및 실행방법](#설치-및-실행방법)
- [주요기능](#주요기능)
- [기술 스택](#기술-스택)
- [프로젝트 후기](#프로젝트-후기)

<br>

## 설치 및 실행방법

1. 터미널을 실행시키고 프로젝트를 clone 받을 폴더로 이동합니다.
2. 프로젝트를 clone 합니다.
   ```
   git clone https://github.com/JinkwonHeo/github-graphql.git
   ```
3. 프로젝트의 루트폴더에 .env.local 파일을 만든 후 발급받은 GitHub access token을 다음과 같이 환경변수로 설정해줍니다.
   ```
   REACT_APP_GITHUB_AUTH_TOKEN=<Your GitHub personal access token>
   ```
4. 프로젝트 폴더로 이동 후 yarn을 입력하여 설치합니다.
   ```
   yarn
   ```
5. yarn start를 입력하여 프로젝트를 실행합니다.
   ```
   yarn start
   ```

<br>

## 주요기능

- 검색어를 입력하여 레포지토리 검색
- 검색어에 해당하는 레포지토리 정보를 5개씩 보여주고 버튼을 클릭하면 더 불러오는 기능 (cursor based pagination)
- 마음에 드는 레포지토리 addStar/removeStar 기능 (즐겨찾기)
- 맨 위로 가기 버튼
- 휴대폰 사용자를 위한 반응형 UI

<br>

## 기술 스택

- TypeScript
- React
- Relay
- GraphQL
- Styled-components

<br>

## 프로젝트 후기

### GraphQL과 Relay의 이해

- GraphQL을 처음 사용해보면서 그 동안 익숙하게 사용하던 REST API와는 조금 다른 특징이 있었습니다.
  - query를 통해 서버에서 원하는 정보만을 가져올 수 있다.
  - 수 많은 end point를 사용해야 했던 REST와는 달리 하나의 end point를 사용한다.
  - 엄격한 데이터 유형을 통해 서버와의 통신 에러를 줄여준다.
  - relay를 통해 View에 필요한 데이터를 가져오고 컴포넌트에 필요한 데이터를 fragment로 지정해줄 수 있다.
- GraphQL을 사용함으로써 REST에 비해 서버와의 통신 횟수를 줄일 수 있고 이는 서비스 비용 절감에 도움이 될 것으로 생각됩니다.

### 공식문서를 읽는 습관

- 프로젝트를 진행하면서 평소 공식문서를 꼼꼼히 읽던 습관이 많은 도움이 되었습니다. <br>
  Relay와 GraphQL은 다른 기술 스택보다 상대적으로 참고할 자료가 부족했기 때문에 공식문서를 읽으면서 작업해야 했습니다. 만약 평소 기술스 택의 공식문서를 읽는 습관이 없었다면 프로젝트를 진행하는 데 큰 어려움을 겪었을 것으로 생각됩니다. <br>
  또한 제가 만든 프로그램을 다른 사람이 잘 이해하고 쉽게 사용할 수 있도록 문서화에 대한 중요성을 생각하게 되었습니다.

### UX에 대한 고민

- 처음 Pagination을 구현할 때는 GraphQL 문서의 Pagination과 Relay 문서의 Refreshing and Refetching - Refetching Queries with Different Data를 참고하여 구현하였습니다. <br>
  더 보기 버튼을 누르면 다음 5개의 레포지토리 정보가 보이는 점에서 기능상으로는 문제가 없었지만, 버튼을 누를 때마다 이전 결과들은 지워지고 새로운 결과만을 보여준다는 점과 리렌더링이 필요 없는 부분도 같이 리렌더링이 된다는 점에 사용자경험이 좋지 못하다고 판단하였습니다. <br>
- 이를 해결하기 위해 usePaginationFragment 훅을 도입하여 기존 결과에 새로운 결과를 덧붙임으로써 사용자가 이전 결과들까지 확인할 수 있도록 하였습니다. <br>
  또한 더 보기 버튼을 너무 많이 누르게 되면 최상단에 있는 처음 화면으로 버튼을 누르기까지 너무 많은 스크롤을 해야 하므로 맨 위로 가기 버튼을 추가함으로써 사용자경험을 개선하였습니다.
