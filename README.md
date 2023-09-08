# 원티드 프리온보딩 프론트엔드 12기 Week 2 과제 - 특정 깃헙 저장소의 이슈 목록 페이지 구현

## 1. 참가자 프로필

|                                   사진                                    | 정보                                                                                                                                                                                                                                                                                                                                                  |
| :-----------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/ha-il" width=150px><br /> | - 성명: **김형우** <br /> - 원티드 가입 이메일: **hyeongwookim.dev@gmail.com** <br /> - 이력서: [링크](https://distinct-attraction-cde.notion.site/a5f3299269e045a0bfed0d7af7d869d4?pvs=4) <br /> - 개인 블로그: [링크](https://ha-il.github.io/) <br /> - 개인 프로젝트: [당신의 작업실(깃허브 저장소 링크)](https://github.com/ha-il/project-pixel) |

## 2. 디렉터리 구조

```shell
 ├ .husky # git hook 설정 자동화를 위한 husky 설정
 ├ src
 │ ├ api # 검색 결과 API 요청과 로컬 캐싱 로직 파일
 │ ├ components
 │ │ ├ CurrentKeywordsAreaItema # 현재 검색어로 검색된 추천 검색어를 렌더링하는 컴포넌트 폴더
 │ │ │ ├ CurrentRecommendedKeyword.tsx
 │ │ │ └ FocusedRecommendedKeyword.tsx
 │ │ ├ SearchWindowItems
 │ │ │ ├ CurrentKeyword.tsx # 현재 검색 중인 단어를 렌더링하는 컴포넌트
 │ │ │ ├ CurrentKeywordsArea.tsx # 현재 검색어의 결과를 렌더링하는 컴포넌트
 │ │ │ └ RecomendedKeywordsArea.tsx # 기존의 추천 검색어를 렌더링하는 컴포넌트
 │ │ ├ common # 돋보기 아이콘, 메시지 등 공용으로 사용되는 컴포넌트 폴더
 │ │ ├  SearchBar.tsx # 검색 바 컴포넌트
 │ │ └ SearchWindow.tsx # 검색 창 컴포넌트
 │ ├ constants
 │ ├ hooks
 │ │ └ useSearch.tsx # 검색 결과를 받아오는 커스텀 훅
 │ ├ utils
 │ │ └ isEmptyString.ts
 │ ├  App.css
 │ ├  App.tsx
 │ ├  index.css
 │ ├  index.tsx
 │ └ react-app-env.d.ts
 ├ .eslintrc # 코드 스타일 통일을 위한 esLint 설정
 └ .prettierrc # 코드 포맷팅을 위한 prettier 설정
```

## 3. 추가한 라이브러리

| 목적      | 이름                                   | 버전    | 링크                                                                                                                                         |
| --------- | -------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 스타일    | styled-components                      | ^6.0.7  | [https://www.npmjs.com/package/styled-components](https://www.npmjs.com/package/styled-components)                                           |
| 환경 설정 | eslint                                 | ^8.48.0 | [https://www.npmjs.com/package/eslint](https://www.npmjs.com/package/eslint)                                                                 |
| 환경 설정 | prettier                               | ^3.0.3  | [https://www.npmjs.com/package/prettier](https://www.npmjs.com/package/prettier)                                                             |
| 환경 설정 | husky                                  | ^8.0.3  | [https://www.npmjs.com/package/husky](https://www.npmjs.com/package/husky)                                                                   |
| 환경 설정 | lint-staged                            | ^14.0.1 | [https://www.npmjs.com/package/lint-staged](https://www.npmjs.com/package/lint-staged)                                                       |
| 환경 설정 | eslint-plugin-no-relative-import-paths | ^1.5.2  | [https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths](https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths) |

<br />

## 4. 개발 환경에서 프로젝트 실행 방법

1. 터미널에서 이 저장소를 git clone 하거나, 이 저장소의 파일을 다운받아 압축을 해제한 뒤 터미널로 열어주세요.
   <br/>
2. 터미널에 아래와 같이 명령어를 입력합니다.

   ```
   # git clone 한 경우
   cd clinical-trials-search-box

   # 파일을 다운받은 경우
   cd clinical-trials-search-box-main
   ```

3. 터미널에 `npm install`을 입력하여 의존성을 설치합니다.
   <br/>

4. [assignment-api](https://github.com/walking-sunset/assignment-api) 깃헙 저장소를 참고하여 로컬 서버를 실행해주세요.
   <br/>

5. `npm start`를 입력하여 애플리케이션을 실행합니다.
   <br />

## 5. 데모 영상 & 이미지

### 5.1 검색창 UI & 검색창 키보드 이동 기능

|                                             검색창 UI & 검색창 키보드 이동 기능                                              |
| :--------------------------------------------------------------------------------------------------------------------------: |
|                  검색바 클릭 → 검색창 렌더링 → 검색어 입력 → </br>추천 검색어 렌더링 → 키보드로 검새어 이동                  |
| ![keyborad](https://github.com/WANTED-TEAM14/pre-onboarding-12th-3-14/assets/108077643/e5ae5d65-6c4c-4a1a-9165-c6f6f1839b32) |

### 5.2 API 호출 횟수 디바운싱 & 로컬 캐싱

|                                                        이슈 목록 페이지                                                        |
| :----------------------------------------------------------------------------------------------------------------------------: |
|         콘솔을 통해 API 호출이 디바운싱 되고 있음을 확인. </br> 로컬 캐싱으로 같은 검색어 입력할 경우 API 호출 안 함.          |
| ![debouncing](https://github.com/WANTED-TEAM14/pre-onboarding-12th-3-14/assets/108077643/5d8353a5-26ee-40ec-86e9-17a00d2b7c8c) |

### 5.3 캐시 스토리지 활용

|                                                                 캐시 스토리지 활용                                                                  |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                     API 요청이 발생할 경우 Clinic-trials-search 캐시 스토리지에 결과가 저장됨.                                      |
| <img alt=caching src="https://github.com/WANTED-TEAM14/pre-onboarding-12th-3-14/assets/108077643/791d59f7-8247-41c1-ac20-d425613f7004" width=480px> |

## 6. 핵심 기능 구현

Best Practice 도출 과정의 상세 설명은 해당 [링크](https://distinct-attraction-cde.notion.site/1-445e2326b84945798c1e621deb042002?pvs=4)에서 확인하실 수 있습니다.

## 6.1 API 호출별로 로컬 캐싱 구현

- **로컬 캐싱 구현 전략**: 캐시 스토리지
  </br>
- **전략 선정 이유**

  - 로컬 스토리지, 세션 스토리지, 캐시 스토리지 중에서 고민했다.
  - 로컬스토리지의 데이터는 만료되지 않아서 expire time을 구현해야 하는 이번 과제에는 적합하지 않다고 판단했다.
  - 세션 스토리지는 페이지를 닫을 때 사라지기 때문에 만료 기간을 설정할 수 없어 적합하지 않다고 판단했다.
  - 캐시 스토리지의 경우 expire time 구현에 적합할 것 같아서 선정했다.

## 6.2 디바운싱: 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략

- **API 호출 횟수를 줄이는 전략**: 디바운싱
  </br>
- **전략 선정 이유**
  - [useDeferredValue](https://react.dev/reference/react/useDeferredValue)라는 리액트 훅을 사용해보려 했으나, useDeferredValue에 전달하는 값은 문자열 및 숫자와 같은 원시값이거나 렌더링 외부에서 생성된 객체여야 한다는 공식 문서 내용이 있었다.
  - 현재 프로젝트에서는 state인 keyword를 기준으로 API를 호출하고 UI를 렌더링하고 있기 때문에, useDeferredValue를 사용하면 렌더링할 때마다 값이 달라져 불필요한 백그라운드 재렌더링이 발생할 수 있어서 이번 프로젝트에서는 사용하기 어려웠다.
  - loadash의 debounce 메서드도 사용할 수 있었으나, 디바운싱을 구현해야하는 이번 과제에서 메서드 하나로 구현하는 것은 적합하지 않다고 판단했다.
  - 따라서 setTimeout을 이용해서 로직을 직접 구현하여 제출하는 것이 이번 과제 취지에 적합하다고 판단했다.

## 6.3 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- **키보드 이동 구현 전략**

  - 검색 결과에서 현재 포커싱 중인 항목의 인덱스를 표현하는 `focusedResult`라는 상태값을 사용하여, 키보드를 누를 때마다 `focusedResult`를 1씩 증가/감소시키는 방식으로 추천 검색어 사이를 이동할 수 있게 구현했다.
    </br>

- **키보드 이동 구현 고려 사항**

  - `focusedResult`의 최대 값이 화면에 노출되는 결과물 수 7개에 맞춰져 있다보니, 7개 보다 적은 결과물이 나오면 포커싱이 사라지는 버그를 발견했다.
  - 해당 버그를 수정하기 위해 검색 결과를 담은 배열의 길이를 useKeyDown 커스텀 훅에 전달해줘야 할 것 같다.
    </br>
