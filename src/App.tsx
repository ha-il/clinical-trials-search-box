import React, { useState } from 'react';

import './App.css';
import { styled } from 'styled-components';

import SearchBar from './components/SearchBar';
import SearchWindow from './components/SearchWindow';

function App() {
  const [keyword, setKeyword] = useState('');
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [focusedResult, setFocuedResult] = useState(0);

  return (
    <div className='App'>
      <Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </Title>
      <SearchBar
        isSearchBarFocused={isSearchBarFocused}
        focusedResult={focusedResult}
        setIsSearchBarFocused={setIsSearchBarFocused}
        setFocuedResult={setFocuedResult}
        setKeyword={setKeyword}
      />
      {isSearchBarFocused && <SearchWindow keyword={keyword} focusedResult={focusedResult} />}
    </div>
  );
}

export default App;

const Title = styled.h1`
  padding: 0 2.5rem;
  margin-bottom: 40px;
`;
