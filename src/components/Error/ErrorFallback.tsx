import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";
import get from "lodash.get";
import { Stack } from "@deskpro/app-sdk";
import { ZoomError } from "../../services/zoom";
import { ErrorBlock } from "./ErrorBlock";
import { Container, Button } from "../common";
import type { FC } from "react";

type Props = Omit<FallbackProps, "error"> & {
    error: Error,
};

const ErrorFallback: FC<Props> = ({ resetErrorBoundary, error }) => {
  const navigate = useNavigate();

  let message = "There was an error!";
  let button = null;
  const nativeErrorMessage = error;

  const toLogin = useCallback(() => {
    resetErrorBoundary();
    navigate("/login");
  }, [navigate, resetErrorBoundary]);

  if (error instanceof ZoomError) {
    const { status, data } = error;

    switch (status) {
      case 400:
        message = get(data, ["message"], "There was an error!");
        break;
      case 401:
        message = "Authentication information is not valid or is missing";
        button = <Button text="Log In" intent="secondary" onClick={toLogin} />;
        break;
      default:
        message = "There was an error!";
    }
  }

  // eslint-disable-next-line no-console
  console.error(nativeErrorMessage);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
            {button}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
