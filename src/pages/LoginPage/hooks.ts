import { defaultLoginError } from "./constants";
import { isAccessToken, isErrorMessage, getAccessTokenService, getCurrentUserService } from "@/services/zoom";
import { setAccessTokenService, setRefreshTokenService } from "@/services/deskpro";
import { useCallback, useState } from "react";
import { useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import type { IOAuth2, OAuth2Result } from "@deskpro/app-sdk";
import type { TicketData, Settings } from "@/types";

interface UseLogin {
  onSignIn: () => void,
  authUrl: string | null,
  error: null | string,
  isLoading: boolean,
};

export function useLogin(): UseLogin {
  const [authUrl, setAuthUrl] = useState<string | null>(null)
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [oAuth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)

  const navigate = useNavigate()
  const { context } = useDeskproLatestAppContext<TicketData, Settings>();

  useInitialisedDeskproAppClient(async (client) => {
    if (context?.settings === undefined) {
      // Make sure settings have loaded.
      return;
    }
    const clientId = context?.settings.client_id;
    const mode = context?.settings.use_advanced_connect === false ? 'global' : 'local';
    if (mode === 'local' && (typeof clientId !== 'string' || clientId.trim() === "")) {
      // Local mode requires a clientId.
      setError("A client ID is required");
      return;
    }

    const oAuth2Response = mode === 'local'
      ? await client.startOauth2Local(
        ({ state, callbackUrl }) => `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${callbackUrl}`,
        /code=(?<code>[\d\w-]+)/,
        async (code: string): Promise<OAuth2Result> => {
          // Extract the callback URL from the authorization URL
          const url = new URL(oAuth2Response.authorizationUrl);
          const redirectUri = url.searchParams.get("redirect_uri");

          if (!redirectUri) {
            throw new Error("Failed to get callback URL");
          }

          const data = await getAccessTokenService(client, code, redirectUri);

          if (!isAccessToken(data)) {
            throw new Error(isErrorMessage(data) ? data.errorMessage : defaultLoginError);
          }

          return { data };
        }
      )
      : await client.startOauth2Global("GKHUwXzTsa3QJsm8Dhp8w");

    setAuthUrl(oAuth2Response.authorizationUrl);
    setOAuth2Context(oAuth2Response);
  }, [context?.settings.client_id, context?.settings.use_advanced_connect]);


  useInitialisedDeskproAppClient((client) => {
    if (!oAuth2Context) {
      return
    }

    const startPolling = async () => {
      try {
        const result = await oAuth2Context.poll();

        const [access, refresh] = await Promise.all([
          setAccessTokenService(client, result.data.access_token),
          result.data.refresh_token
            ? setRefreshTokenService(client, result.data.refresh_token)
            : Promise.resolve({ isSuccess: true, errors: [], }),
        ]);

        if (!access.isSuccess || !refresh.isSuccess) {
          throw new Error(([] as string[]).concat(access.errors, refresh.errors).join(", "));
        }

        try {
          const user = await getCurrentUserService(client);
          if (!user?.id) {
            throw new Error()
          }
        } catch {
          throw new Error("Can't find current user");
        }

        navigate("/home")

      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");

      } finally {
        setIsLoading(false)
        setIsPolling(false)
      }
    }

    if (isPolling) {
      void startPolling()
    }
  }, [isPolling, oAuth2Context, navigate])


  const onSignIn = useCallback(() => {
    setIsLoading(true);
    setIsPolling(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);


  return { authUrl, onSignIn, error, isLoading }
};