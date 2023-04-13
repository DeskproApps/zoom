import { useState, useEffect, useMemo, useCallback } from "react";
import { createSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import get from "lodash.get";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setAccessTokenService } from "../../services/deskpro";
import {
  isAccessToken,
  isErrorMessage,
  getAccessTokenService,
  getCurrentUserService,
} from "../../services/zoom";
import { defaultLoginError } from "./constants";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { Maybe, TicketContext } from "../../types";

type UseLogin = () => {
  isAuth: boolean;
  authLink: string;
  isLoading: boolean;
  onSignIn: () => void;
  error: Maybe<Error>;
};

const useLogin: UseLogin = () => {
  const key = useMemo(() => uuidv4(), []);
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as {
    context: TicketContext;
  };

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authLink, setAuthLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [callback, setCallback] = useState<
    OAuth2StaticCallbackUrl | undefined
  >();
  const [error, setError] = useState<Maybe<Error>>(null);

  const clientId = get(context, ["settings", "client_id"]);
  const callbackUrl = get(callback, ["callbackUrl"]);

  const onSignIn = useCallback(() => {
    if (!client || !callback?.poll || !callback.callbackUrl) {
      return;
    }

    setError(null);
    setTimeout(() => setIsLoading(true), 1000);

    callback
      .poll()
      .then(({ token }) =>
        getAccessTokenService(client, token, callback.callbackUrl)
      )
      .then((data) =>
        isAccessToken(data)
          ? setAccessTokenService(client, data.access_token)
          : Promise.reject(
              isErrorMessage(data) ? data.errorMessage : defaultLoginError
            )
      )
      .then(({ isSuccess, errors }) =>
        isSuccess ? Promise.resolve() : Promise.reject(errors)
      )
      .then(() => getCurrentUserService(client))
      .then((user) =>
        get(user, ["id"], null)
          ? setIsAuth(true)
          : setError(new Error("Can't find current user"))
      )
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [callback, client, setIsLoading]);

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

  return { isAuth, error, authLink, onSignIn, isLoading };
};

export { useLogin };
