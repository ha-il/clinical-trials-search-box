const BASE_URL = 'http://localhost:4000/sick';
const HEADER_FETCH_DATE = 'fetch-date';
const ONE_DAY_MILISECOND = 1000 * 60 * 60 * 24;

const CACHE_STORAGE = 'Clinic-trials-search';

export default class CacheApiServer {
  private static giCacheStorage = CACHE_STORAGE;

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
