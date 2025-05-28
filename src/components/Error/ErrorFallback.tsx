import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@deskpro/deskpro-ui";
import { ZoomError } from "@/services/zoom";
import { ErrorBlock } from "@/components/Error/ErrorBlock";
import { Container, Button } from "@/components/common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ resetError, error }) => {
  const navigate = useNavigate();

  let message = "There was an error!";
  let button = null;
  const nativeErrorMessage = error;

  const toLogin = useCallback(() => {
    resetError();
    navigate("/login");
  }, [navigate, resetError]);

  if (error instanceof ZoomError) {
    const { status, data } = error;

    switch (status) {
      case 400:
        message = data?.message ?? 'There was an error!';
        break;
      case 401:
        message = "Authentication information is not valid or is missing";
        button = <Button text="Log In" intent="secondary" onClick={toLogin} />;
        break;
      default:
        message = data?.message
          || data?.reason
          || data?.error
          || "There was an error!";
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
