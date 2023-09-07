import { styled } from 'styled-components';

import useSearch from '../../hooks/useSearch';
import { isEmptyString } from '../../utils/isEmptyString';
import CurrentRecommendedKeyword from '../CurrentKeywordsAreaItema/CurrentRecommendedKeyword';
import FocusedRecommendedKeyword from '../CurrentKeywordsAreaItema/FocusedRecommendedKeyword';
import { Props } from '../SearchWindow';

function CurrentKeywordsArea({ keyword, focusedResult }: Props) {
  const { recommendedKeywords, isLoading } = useSearch(keyword);
  const MAX_RESULT_LENGTH = 7;
  const shownRecommendedKeywords = recommendedKeywords.slice(0, MAX_RESULT_LENGTH);
  const isResultNotFound =
    !isLoading && shownRecommendedKeywords.length === 0 && !isEmptyString(keyword);

  return (
    <CurrentKeywordsAreaWrapper>
      <AreaTitle>{isEmptyString(keyword) ? '최근 검색어' : '추천 검색어'}</AreaTitle>
      {isEmptyString(keyword) && <div>최근 검색어가 없습니다.</div>}
      <CurrentRecommendedKeywords>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : (
          shownRecommendedKeywords.map((recommendedKeyword, idx) => {
            if (idx === focusedResult)
              return <FocusedRecommendedKeyword recommendedKeyword={recommendedKeyword} />;
            return <CurrentRecommendedKeyword recommendedKeyword={recommendedKeyword} />;
          })
        )}
        {isResultNotFound && <div>관련 검색어 없음</div>}
      </CurrentRecommendedKeywords>
    </CurrentKeywordsAreaWrapper>
  );
}
export default CurrentKeywordsArea;

const AreaTitle = styled.div`
  margin: 0 0 24px 0;
  color: rgba(0, 0, 0, 0.5);
`;

const CurrentKeywordsAreaWrapper = styled.div`
  padding: 0 0 24px 24px;
`;

const CurrentRecommendedKeywords = styled.ul``;
