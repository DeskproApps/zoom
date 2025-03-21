import { useState } from "react";
import styled from "styled-components";
import { P1 } from "@deskpro/deskpro-ui";
import {
  LoadingSpinner,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { CopyToClipboardInput } from "@/components/common";
import type { FC } from "react";
import type { OAuth2Result } from "@deskpro/app-sdk";

const Description = styled(P1)`
    margin-top: 8px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.grey80};
`;

const AdminPage: FC = () => {
  const [callbackUrl, setCallbackUrl] = useState<string|null>(null);

  useInitialisedDeskproAppClient(async (client) => {
    const oauth2 = await client.startOauth2Local(
      ({ state, callbackUrl }) => `https://zoom.us/oauth/authorize?response_type=code&client_id=xxx&state=${state}&redirect_uri=${callbackUrl}`,
      /code=(?<code>[0-9a-f]+)/,
      async (): Promise<OAuth2Result> => ({ data: { access_token: "", refresh_token: "" } })
    );

    // Extract the callback URL from the authorization URL
    const url = new URL(oauth2.authorizationUrl);
    const redirectUri = url.searchParams.get("redirect_uri");

    if (redirectUri) {
      setCallbackUrl(redirectUri);
    }
  });

  if (!callbackUrl) {
    return (<LoadingSpinner/>);
  }

  return (
    <>
      <CopyToClipboardInput value={callbackUrl} />
      <Description>The callback URL will be required during Zoom app setup</Description>
    </>
  );
};

export { AdminPage };