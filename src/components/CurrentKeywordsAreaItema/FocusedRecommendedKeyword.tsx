import { styled } from 'styled-components';

import { Sick } from '../../hooks/useSearch';
import ScopeIcon from '../common/ScopeIcon';

function FocusedRecommendedKeyword({ recommendedKeyword }: { recommendedKeyword: Sick }) {
  return (
    <FocusedRecommendedKeywordWrapper key={recommendedKeyword.sickCd}>
      <ScopeIcon />
      <div>{recommendedKeyword.sickNm}</div>
    </FocusedRecommendedKeywordWrapper>
  );
}
export default FocusedRecommendedKeyword;

const FocusedRecommendedKeywordWrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  background-color: #eef8ff;
  & svg {
    color: rgba(0, 0, 0, 0.2);
  }
`;
