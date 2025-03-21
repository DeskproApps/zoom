import { AnchorButton } from "@/components/common";
import { ErrorBlock } from "@/components";
import { H3, Stack } from "@deskpro/deskpro-ui";
import { useDeskproElements } from "@deskpro/app-sdk";
import { useLogin } from "./hooks";
import { useSetTitle } from "@/hooks";
import type { FC } from "react";

const LoginPage: FC = () => {
  const { onSignIn, authUrl, isLoading, error } = useLogin();

  useSetTitle("Zoom Meetings");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
  });

  return (
    <Stack padding={12} vertical gap={12} role="alert">
      <H3>Log into your Zoom Account.</H3>
      <AnchorButton
        intent="secondary"
        text="Log In"
        target="_blank"
        href={authUrl ?? "#"}
        onClick={onSignIn}
        loading={isLoading}
        disabled={!authUrl || isLoading}
      />

      {error && (<div style={{ width: "100%" }}><ErrorBlock text={error} /></div>)}
    </Stack>
  );
};

export { LoginPage };
