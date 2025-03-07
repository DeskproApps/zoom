import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { H3 } from "@deskpro/deskpro-ui";
import { Title, useDeskproElements } from "@deskpro/app-sdk";
import { useSetTitle } from "@/hooks";
import { useLogin } from "./hooks";
import { Container, AnchorButton } from "@/components/common";
import type { FC } from "react";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const {
    isAuth,
    authLink,
    onSignIn,
    isLoading,
  } = useLogin();

  useSetTitle("Zoom Meetings");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  return (
    <Container>
      <Title as={H3} title="Log into your Zoom Account" />
      <AnchorButton
        intent="secondary"
        text="Log In"
        target="_blank"
        href={authLink}
        onClick={onSignIn}
        loading={isLoading}
        disabled={isLoading}
      />
    </Container>
  );
};

export { LoginPage };
