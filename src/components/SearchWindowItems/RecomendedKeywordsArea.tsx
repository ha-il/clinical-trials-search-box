import { styled } from 'styled-components';

import { DEFAULT_RECOMENDED_KEYWORDS } from '../../constants';

function RecomendedKeywordsArea() {
  return (
    <RecomendedKeywordsAreaWrapper>
      <div>추천 검색어로 검색해보세요.</div>
      <RecomendedKeywords>
        {DEFAULT_RECOMENDED_KEYWORDS.map((keyword, idx) => (
          <RecomendedKeyword key={idx}>{keyword}</RecomendedKeyword>
        ))}
      </RecomendedKeywords>
    </RecomendedKeywordsAreaWrapper>
  );
}
export default RecomendedKeywordsArea;

const RecomendedKeywordsAreaWrapper = styled.div`
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
