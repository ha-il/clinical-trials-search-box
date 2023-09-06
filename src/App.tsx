import React, { useEffect, useState } from 'react';

import './App.css';
import { styled } from 'styled-components';

import CacheApiServer from './api/CacheApiServer';

const DEFAULT_RECOMENDED_KEYWORDS = ['B형 간염', '비만', '관절염', '우울증', '식도염'];
interface Sick {
  sickCd: string;
  sickNm: string;
}

const isEmptyString = (keyword: string) => keyword === '';

function App() {
  const [keyword, setKeyword] = useState('');
  const [recommendedKeywords, setRecommendedKeywords] = useState<Sick[]>([]);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocusInput = () => setIsSearchBarFocused(true);
  const handleBlurInput = () => setIsSearchBarFocused(false);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value);

  useEffect(() => {
    setIsLoading(true);
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

  return (
    <div className='App'>
      <Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </Title>
      <SearchBar $isSearchBarFocused={isSearchBarFocused}>
        <ScopeIcon>
          <svg
            viewBox='0 0 16 16'
            fill='currentColor'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z'></path>
          </svg>
        </ScopeIcon>
        <input
          type='text'
          placeholder='질환명을 입력해 주세요.'
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          onChange={handleChangeInput}
          //value={keyword}
        />
        <button type='button'>
          <ScopeIcon>
            <svg
              viewBox='0 0 16 16'
              fill='currentColor'
              preserveAspectRatio='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z'></path>
            </svg>
          </ScopeIcon>
        </button>
      </SearchBar>
      {isSearchBarFocused && (
        <SerachWindow>
          {!isEmptyString(keyword) && (
            <CurrentKeyword>
              <svg
                viewBox='0 0 16 16'
                fill='currentColor'
                preserveAspectRatio='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z'></path>
              </svg>
              <div>{keyword}</div>
            </CurrentKeyword>
          )}

          <CurrentKeywordsArea>
            <div>{isEmptyString(keyword) ? '최근 검색어' : '추천 검색어'}</div>

            {isEmptyString(keyword) && !isLoading && <div>최근 검색어가 없습니다.</div>}
            <CurrentRecommendedKeywords>
              {isLoading && <div>로딩 중...</div>}
              {!isLoading && recommendedKeywords.length === 0 && keyword.length !== 0 && (
                <div>관련 검색어 없음</div>
              )}
              {!isLoading &&
                recommendedKeywords.slice(0, 7).map(keyword => (
                  <CurrentRecommendedKeyword key={keyword.sickCd}>
                    <svg
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      preserveAspectRatio='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z'></path>
                    </svg>

                    <div>{keyword.sickNm}</div>
                  </CurrentRecommendedKeyword>
                ))}
            </CurrentRecommendedKeywords>
          </CurrentKeywordsArea>

          {isEmptyString(keyword) && (
            <RecomendedKeywordsArea>
              <div>추천 검색어로 검색해보세요.</div>
              <RecomendedKeywords>
                {DEFAULT_RECOMENDED_KEYWORDS.map((keyword, idx) => (
                  <RecomendedKeyword key={idx}>{keyword}</RecomendedKeyword>
                ))}
              </RecomendedKeywords>
            </RecomendedKeywordsArea>
          )}
        </SerachWindow>
      )}
    </div>
  );
}

export default App;

const Title = styled.h1`
  padding: 0 2.5rem;
  margin-bottom: 40px;
`;

const ScopeIcon = styled.div`
  width: 21px;
  height: 21px;
  color: rgba(0, 0, 0, 0.1);
  padding: 0 6px;
`;

const SearchBar = styled.div<{ $isSearchBarFocused: boolean }>`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 6px 0 0;
  border-radius: 42px;
  padding: 10px 10px 10px 24px;
  border: ${({ $isSearchBarFocused }) =>
    $isSearchBarFocused ? '2px solid #007be9' : '2px solid transparent'};

  & input {
    padding: 1px 25px 1px 2px;
    background-color: transparent;
    border: none;
    width: 400px;
    height: 25px;
    outline: none;
  }
  & button {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background-color: #007be9;
    border: none;
    & div {
      color: white;
    }
  }
`;

const SerachWindow = styled.div`
  background-color: white;
  padding: 20px 0;
  border-radius: 21px;
  position: absolute;
  width: 530px;
  top: 315px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
`;

const CurrentKeywordsArea = styled.div`
  padding: 0 0 24px 24px;
  & div:first-child {
    margin: 0 0 24px 0;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const CurrentKeyword = styled.div`
  padding: 24px 0 24px 24px;
  display: flex;
  align-items: center;
  & svg {
    color: rgba(0, 0, 0, 0.2);
    width: 21px;
    height: 21px;
    padding: 0 6px;
  }
`;

const RecomendedKeywordsArea = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px 0 0 24px;
  & div:first-child {
    margin: 0 0 24px 0;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const RecomendedKeywords = styled.ul`
  display: flex;
`;

const RecomendedKeyword = styled.li`
  background-color: #eef8ff;
  color: #007be9;
  padding: 16px;
  margin: 0 8px 0 0;
  border-radius: 32px;
`;

const CurrentRecommendedKeywords = styled.ul``;
const CurrentRecommendedKeyword = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  & svg {
    color: rgba(0, 0, 0, 0.2);
    width: 21px;
    height: 21px;
    padding: 0 6px;
  }
`;
