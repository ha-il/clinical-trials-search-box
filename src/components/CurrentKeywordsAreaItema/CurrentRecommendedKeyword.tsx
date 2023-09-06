import { styled } from 'styled-components';

import { Sick } from '../../hooks/useSearch';
import ScopeIcon from '../common/ScopeIcon';

function CurrentRecommendedKeyword({ recommendedKeyword }: { recommendedKeyword: Sick }) {
  return (
    <CurrentRecommendedKeywordWrapper key={recommendedKeyword.sickCd}>
      <ScopeIcon />
      <div>{recommendedKeyword.sickNm}</div>
    </CurrentRecommendedKeywordWrapper>
  );
}
export default CurrentRecommendedKeyword;

const CurrentRecommendedKeywordWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  & svg {
    color: rgba(0, 0, 0, 0.2);
  }
`;
