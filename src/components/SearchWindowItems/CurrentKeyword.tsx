import { styled } from 'styled-components';

import ScopeIcon from '../common/ScopeIcon';

function CurrentKeyword({ keyword }: { keyword: string }) {
  return (
    <CurrentKeywordWrapper>
      <ScopeIcon />
      <div>{keyword}</div>
    </CurrentKeywordWrapper>
  );
}
export default CurrentKeyword;

const CurrentKeywordWrapper = styled.div`
  padding: 24px 0 24px 24px;
  display: flex;
  align-items: center;
  & svg {
    color: rgba(0, 0, 0, 0.2);
  }
`;
