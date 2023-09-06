import React from 'react';

import './App.css';
import { styled } from 'styled-components';

function App() {
  return (
    <div className='App'>
      <Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </Title>
      <SearchBar>
        <input type='text' placeholder='질환명을 입력해 주세요.' />
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
  color: white;
  padding: 0 6px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0 6px 0 0;
  border-radius: 42px;
  padding: 10px 10px 10px 24px;
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
  }
`;
