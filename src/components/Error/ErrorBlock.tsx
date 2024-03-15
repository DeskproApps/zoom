import { FC } from "react";
import styled from "styled-components";
import { Stack, P1 } from "@deskpro/deskpro-ui";

type Props = {
  text: string | JSX.Element | Array<string | JSX.Element>,
}

const StyledErrorBlock = styled(Stack)`
  width: 100%;
  margin-bottom: 8px;
  padding: 4px 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.red100};
`;

const ErrorBlock: FC<Props> = ({ text = "An error occurred" }) => (
  <StyledErrorBlock>
    {Array.isArray(text)
      ? text.map((msg, idx) => (<P1 key={idx}>{msg}</P1>))
      : <P1>{text}</P1>
    }
  </StyledErrorBlock>
);

export { ErrorBlock };
