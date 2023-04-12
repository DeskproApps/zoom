import styled, { css } from "styled-components";
import { Stack } from "@deskpro/deskpro-ui";
import { Property } from "./Property";
import type { FC } from "react";
import type { Props as PropertyProps } from "./types";

export type Props = {
  marginBottom?: number,
  leftLabel?: PropertyProps["label"],
  leftText?: PropertyProps["text"],
  rightLabel?: PropertyProps["label"],
  rightText?: PropertyProps["text"],
};

const Container = styled(Stack)`
  width: 100%;
  margin-bottom: -1px;
`;

const Side = styled.div<Pick<Props, "marginBottom"> & { withDivider?: boolean,  }>`
  display: inline-block;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};

  ${({withDivider}) => withDivider
    ? css`
      width: calc(50% - 6px - 1px);
      padding-left: 10px;
      border-left: 1px solid ${({theme}) => theme.colors.grey20};
    `
    : css`
      width: calc(50% - 6px);
    `
  }
`;

const TwoProperties: FC<Props> = ({
  leftLabel,
  leftText,
  rightLabel,
  rightText,
  marginBottom = 7,
}) => (
  <Container>
    <Side marginBottom={marginBottom}>
      <Property
        marginBottom={0}
        label={leftLabel}
        text={leftText}
      />
    </Side>
    <Side withDivider marginBottom={marginBottom}>
      <Property
        marginBottom={0}
        label={rightLabel}
        text={rightText}
      />
    </Side>
  </Container>
);

export { TwoProperties };
