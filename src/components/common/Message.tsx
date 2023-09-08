import { styled } from 'styled-components';

interface MessageProp {
  message: string;
}

function Message({ message }: MessageProp) {
  return <MessageWrapper>{message}</MessageWrapper>;
}

export default Message;

const MessageWrapper = styled.div`
  margin-left: 24px;
`;
