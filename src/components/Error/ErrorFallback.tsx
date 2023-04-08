import { FallbackProps } from "react-error-boundary";
import { Stack } from "@deskpro/app-sdk";
import { ZoomError } from "../../services/zoom";
import { ErrorBlock } from "./ErrorBlock";
import { Container } from "../common";
import type { FC } from "react";

type Props = Omit<FallbackProps, "error"> & {
    error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
  const message = "There was an error!";

  if (error instanceof ZoomError) {
    /** ToDo: 401: {"code":124,"message":"Access token is expired."} */
    /** ToDo: 404: {"code":3001,"message":"Конференция не найдена, или срок ее действия истек."} */
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
