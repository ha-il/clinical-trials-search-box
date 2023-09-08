import { styled } from 'styled-components';

import { isEmptyString } from '../../utils/isEmptyString';
import Message from '../common/Message';
import RecommendedKeyword from '../CurrentKeywordsAreaItema/RecommendedKeyword';
import { KeywordsProps } from '../SearchWindow';

function CurrentKeywordsArea({
  keyword,
  focusedResult,
  isLoading,
  recommendedKeywords,
}: KeywordsProps) {
  const MAX_RESULT_LENGTH = 7;
  const shownRecommendedKeywords = recommendedKeywords.slice(0, MAX_RESULT_LENGTH);
  const isResultNotFound =
    !isLoading && shownRecommendedKeywords.length === 0 && !isEmptyString(keyword);

  return (
    <CurrentKeywordsAreaWrapper>
      <AreaTitle>{isEmptyString(keyword) ? '최근 검색어' : '추천 검색어'}</AreaTitle>
      {isEmptyString(keyword) && <Message message='최근 검색어가 없습니다.' />}
      <CurrentRecommendedKeywords>
        {isLoading && <Message message='로딩 중...' />}
        {!isLoading &&
          shownRecommendedKeywords.map((recommendedKeyword, idx) => (
            <RecommendedKeyword
              key={recommendedKeyword.sickCd}
              recommendedKeyword={recommendedKeyword}
              isFocused={idx === focusedResult}
            />
          ))}
        {isResultNotFound && <Message message='관련 검색어 없음' />}
      </CurrentRecommendedKeywords>
    </CurrentKeywordsAreaWrapper>
  );
}
export default CurrentKeywordsArea;

const AreaTitle = styled.div`
  margin: 0 0 24px 24px;
  color: rgba(0, 0, 0, 0.5);
`;

const CurrentKeywordsAreaWrapper = styled.div`
  padding: 0 0 24px 0;
`;

const CurrentRecommendedKeywords = styled.ul``;
