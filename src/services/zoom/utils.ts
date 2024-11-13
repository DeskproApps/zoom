import type { OAuthToken, ZoomRestError } from "./types";

const isErrorMessage = (error: ZoomRestError|undefined): error is ZoomRestError => {
  return Boolean(error?.errorMessage);
};

const isAccessToken = (
  payload: OAuthToken | ZoomRestError
): payload is OAuthToken => {
  return Boolean(payload?.access_token);
};

export { isAccessToken, isErrorMessage };
