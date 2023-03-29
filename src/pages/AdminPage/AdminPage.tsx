import { useState, useMemo } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  P1,
  LoadingSpinner,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { CopyToClipboardInput } from "../../components/common";
import type { FC } from "react";

const Description = styled(P1)`
    margin-top: 8px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.grey80};
`;

const AdminPage: FC = () => {
  const [callbackUrl, setCallbackUrl] = useState<string|null>(null);
  const key = useMemo(() => uuidv4(), []);


  useInitialisedDeskproAppClient((client) => {
    client.oauth2()
      .getAdminGenericCallbackUrl(key, /code=(?<token>[0-9a-f]+)/, /state=(?<key>.+)/)
      .then(({ callbackUrl }) => setCallbackUrl(callbackUrl));
  }, [key]);

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
