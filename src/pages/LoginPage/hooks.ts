import { useState, useEffect, useMemo, useCallback } from "react";
import { createSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useAsyncError } from "../../hooks";
import { setAccessTokenService, setRefreshTokenService } from "../../services/deskpro";
import {
  isAccessToken,
  isErrorMessage,
  getAccessTokenService,
  getCurrentUserService,
} from "../../services/zoom";
import { defaultLoginError } from "./constants";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { TicketContext } from "../../types";

type UseLogin = () => {
  isAuth: boolean;
  authLink: string;
  isLoading: boolean;
  onSignIn: () => void;
};

const useLogin: UseLogin = () => {
  const key = useMemo(() => uuidv4(), []);
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as {
    context: TicketContext;
  };
  const { asyncErrorHandler } = useAsyncError();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authLink, setAuthLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [callback, setCallback] = useState<
    OAuth2StaticCallbackUrl | undefined
  >();
  const clientId = context?.settings?.client_id;
  const callbackUrl = callback?.callbackUrl;

  const onSignIn = useCallback(() => {
    if (!client || !callback?.poll || !callback.callbackUrl) {
      return;
    }

    setTimeout(() => setIsLoading(true), 1000);

    callback
      .poll()
      .then(({ token }) => getAccessTokenService(client, token, callback.callbackUrl))
      .then((data) => isAccessToken(data)
        ? Promise.all([setAccessTokenService(client, data), setRefreshTokenService(client, data)])
        : Promise.reject(isErrorMessage(data) ? data.errorMessage : defaultLoginError)
      )
      .then(([access, refresh]) => access.isSuccess && refresh.isSuccess
        ? Promise.resolve()
        : Promise.reject(([] as string[]).concat(access.errors, refresh.errors)))
      .then(() => getCurrentUserService(client))
      .then((user) => {
        if (!Boolean(user?.id)) {
          throw new Error("Can't find current user");
        }
          setIsAuth(true);
      })
      .catch(asyncErrorHandler)
      .finally(() => setIsLoading(false));
  }, [callback, client, setIsLoading, asyncErrorHandler]);

  /** set callback */
  useEffect(() => {
    if (!callback && client) {
      client
        .oauth2()
        .getGenericCallbackUrl(
          key,
          /code=(?<token>[\d\w-]+)/,
          /state=(?<key>.+)/
        )
        .then(setCallback);
    }
  }, [client, key, callback]);

  /** set authLink */
  useEffect(() => {
    if (key && callbackUrl && clientId) {
      setAuthLink(
        `https://zoom.us/oauth/authorize?${createSearchParams([
          ["response_type", "code"],
          ["client_id", clientId],
          ["state", key],
          ["redirect_uri", callbackUrl],
        ])}`
      );
      setIsLoading(false);
    } else {
      setAuthLink("");
      setIsLoading(true);
    }
  }, [key, callbackUrl, clientId]);

  return { isAuth, authLink, onSignIn, isLoading };
};

export { useLogin };
