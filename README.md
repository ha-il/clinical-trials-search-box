# 원티드 프리온보딩 프론트엔드 12기 Week 3 과제 - 임상정보 사이트 검색창 구현

## 로컬 캐싱 : cacheStorage 사용

```typescript
// api/CacheApiServer.ts
const BASE_URL = 'http://localhost:4000/sick';
const HEADER_FETCH_DATE = 'fetch-date';
const ONE_DAY_MILISECOND = 1000 * 60 * 60 * 24;

const CACHE_STORAGE = {
  GIS: 'Clinic-trials-search',
};

export default class CacheApiServer {
  private static giCacheStorage = CACHE_STORAGE.GIS;

  static async getRecommendedKeword(keyword: string) {
    const url = `${BASE_URL}?q=${keyword}`; // 쿼리 url 생성
    const cache = await caches.open(this.giCacheStorage); // 캐시 저장소 열기

    return await this.getValidResponse(cache, url);
  }

  private static async getValidResponse(cache: Cache, url: string) {
    const cacheResponse = await caches.match(url); // 요청 쿼리와 일치하는 캐시 응답 가져오기
    return cacheResponse && !this.isCacheExpired(cacheResponse)
      ? await cacheResponse.json() // 응답이 존재하면 반환
      : await this.getFetchResponse(cache, url); // 존재하지 않으면 서버에 요청
  }

  private static async getFetchResponse(cache: Cache, url: string) {
    const fetchResponse = await fetch(url);
    const newResponse = await this.getResponseWithFetchDate(fetchResponse);
    cache.put(url, newResponse); // 캐시 저장
    console.info('calling api');
    return fetchResponse.json();
  }
  private static isCacheExpired(cacheResponse: Response) {
    const fetchDate = new Date(cacheResponse.headers.get(HEADER_FETCH_DATE)!).getTime();
    const today = new Date().getTime();
    return today - fetchDate > ONE_DAY_MILISECOND;
  }

  private static async getResponseWithFetchDate(fetchResponse: Response) {
    const cloneResponse = fetchResponse.clone();
    const newBody = await cloneResponse.blob();
    const newHeaders = new Headers(cloneResponse.headers);
    newHeaders.append(HEADER_FETCH_DATE, new Date().toISOString());

    return new Response(newBody, {
      status: cloneResponse.status,
      statusText: cloneResponse.statusText,
      headers: newHeaders,
    });
  }
}
```

## 디바운싱

```typescript
// hooks/useSearch.tsx
import { useEffect, useState } from 'react';

import CacheApiServer from '../api/CacheApiServer';
import { isEmptyString } from '../utils/isEmptyString';

export interface Sick {
  sickCd: string;
  sickNm: string;
}

const useSearch = (keyword: string) => {
  const [recommendedKeywords, setRecommendedKeywords] = useState<Sick[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setRecommendedKeywords([]);
    if (!isEmptyString(keyword)) {
      // 디바운싱 코드
      const timer = setTimeout(() => {
        const getRecomendedKeywords = async () => {
          const data = await CacheApiServer.getRecommendedKeword(keyword);
          setRecommendedKeywords(data);
        };
        getRecomendedKeywords();
        setIsLoading(false);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
    setIsLoading(false);
  }, [keyword]);

  return { recommendedKeywords, isLoading };
};

export default useSearch;
```

## 추가로 구현 또는 수정해야 할 것들

- 추천 검색어 태그와 추천 검색어 결과를 클릭하면 자동으로 인풋이 채워지도록 수정하고 싶음
- 추천 검색어 결과에서 검색어와 일치하는 부분만 볼드처리하도록 수정하고 싶음
- 처음에 키보드 움직일 시 두번 렌더링되서 두번 이동되는 버그 고쳐야함.
  - 포커스 상태도 아니고, 결과물도 없는 상황에서도 키보드 이벤트를 발생시키는 것은 불필요한 렌더링을 발생시키기 때문에 수정이 필요함.
- 검색했던 키워드 저장하는 기능 추가하고 싶음
  - 인풋을 폼에 담아서 submit 이벤트 발생시키도록 수정
- 절대 경로 eslint 설정이 에러를 발생시켜서 임시로 삭제했음
- 타입스크립트 미숙으로, 타입 설정이 여기저기 흩어져있음. 타입 설정을 한 곳에서 관리하는게 좋은지, 각 타입이 필요한 곳에서 다루는 게 나은지 상의 해보고 싶음.
- api 서버는 우리가 따로 배포해야 하는지 상의하기.
