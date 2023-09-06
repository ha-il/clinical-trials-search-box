/*
useSearch = (keyword:string) => {} 
*/

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
    //setFocuedResult(0);
    setRecommendedKeywords([]);

    if (!isEmptyString(keyword)) {
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
