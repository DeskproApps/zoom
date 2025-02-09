import { useState } from "react";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useAsyncError } from "@/hooks";
import { setAccessTokenService, setRefreshTokenService } from "@/services/deskpro";
import {
  isAccessToken,
  isErrorMessage,
  getAccessTokenService,
  getCurrentUserService,
} from "@/services/zoom";
import { defaultLoginError } from "./constants";
import type { TicketData, Settings } from "@/types";
import type { OAuth2Result } from "@deskpro/app-sdk";

type UseLogin = () => {
  isAuth: boolean;
  authLink: string;
  isLoading: boolean;
  onSignIn: () => void;
};

const useLogin: UseLogin = () => {
  const { context } = useDeskproLatestAppContext<TicketData, Settings>();
  const { asyncErrorHandler } = useAsyncError();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authLink, setAuthLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useInitialisedDeskproAppClient(async (client) => {
    const clientId = context?.settings?.client_id;

    if (!clientId) {
      setIsLoading(false);
      return;
    }

    const oauth2 = await client.startOauth2Local(
      ({ state, callbackUrl }) => `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${callbackUrl}`,
      /code=(?<code>[\d\w-]+)/,
      async (code: string): Promise<OAuth2Result> => {
        // Extract the callback URL from the authorization URL
        const url = new URL(oauth2.authorizationUrl);
        const redirectUri = url.searchParams.get("redirect_uri");

        if (!redirectUri) {
          throw new Error("Failed to get callback URL");
        }

        const data = await getAccessTokenService(client, code, redirectUri);

        if (!isAccessToken(data)) {
          throw new Error(isErrorMessage(data) ? data.errorMessage : defaultLoginError);
        }

        const [access, refresh] = await Promise.all([
          setAccessTokenService(client, data),
          setRefreshTokenService(client, data),
        ]);

        if (!access.isSuccess || !refresh.isSuccess) {
          throw new Error(([] as string[]).concat(access.errors, refresh.errors).join(", "));
        }

        const user = await getCurrentUserService(client);
        if (!user?.id) {
          throw new Error("Can't find current user");
        }

        return { data };
      }
    );

    setAuthLink(oauth2.authorizationUrl);
    setIsLoading(false);

    try {
      await oauth2.poll();
      setIsAuth(true);
    } catch (error) {
      asyncErrorHandler(error instanceof Error ? error : new Error(String(error)));
    }
  });

  const onSignIn = () => {
    if (authLink) {
      window.open(authLink, "_blank");
    }
  };

  return { isAuth, authLink, onSignIn, isLoading };
};

export { useLogin };