import React from 'react';

import { styled } from 'styled-components';

import { Sick } from '../hooks/useSearch';

import ScopeIcon from './common/ScopeIcon';

export interface InputHandlerProps {
  recommendedKeywords: Sick[];
  keyword: string;
  isSearchBarFocused: boolean;
  focusedResult: number;
  setIsSearchBarFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setFocuedResult: React.Dispatch<React.SetStateAction<number>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({
  recommendedKeywords,
  keyword,
  focusedResult,
  isSearchBarFocused,
  setIsSearchBarFocused,
  setKeyword,
  setFocuedResult,
}: InputHandlerProps) {
  const handleFocusInput = () => setIsSearchBarFocused(true);
  const handleBlurInput = () => setIsSearchBarFocused(false);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocuedResult(0);
    setKeyword(e.target.value);
  };
  const handleKeyDownKeywordsList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowDown' && focusedResult < recommendedKeywords.length - 1)
      setFocuedResult(prev => prev + 1);
    if (e.key === 'ArrowUp' && focusedResult > 0) setFocuedResult(prev => prev - 1);
    if (e.key === 'Escape') e.currentTarget.blur();
  };

  return (
    <SearchBarWrapper $isSearchBarFocused={isSearchBarFocused}>
      <ScopeIcon />
      <SearchBarInput
        type='text'
        placeholder={isSearchBarFocused ? '' : '질환명을 입력해 주세요.'}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDownKeywordsList}
        value={keyword}
      />
      <SearchBarButton type='button'>
        <ScopeIcon />
      </SearchBarButton>
    </SearchBarWrapper>
  );
}
export default SearchBar;

const SearchBarWrapper = styled.div<{ $isSearchBarFocused: boolean }>`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 6px 0 0;
  border-radius: 42px;
  padding: 10px 10px 10px 24px;
  border: ${({ $isSearchBarFocused }) =>
    $isSearchBarFocused ? '2px solid #007be9' : '2px solid transparent'};
`;

const SearchBarInput = styled.input`
  padding: 1px 25px 1px 2px;
  background-color: transparent;
  border: none;
  width: 400px;
  height: 25px;
  outline: none;
`;

const SearchBarButton = styled.button`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: #007be9;
  border: none;
  & div {
    color: white;
  }
`;
