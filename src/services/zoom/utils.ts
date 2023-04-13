import has from "lodash.has";
import type { OAuthToken, ZoomRestError } from "./types";

const isErrorMessage = (error: ZoomRestError): error is ZoomRestError => {
  return has(error, ["errorMessage"]);
};

const isAccessToken = (
  payload: OAuthToken | ZoomRestError
): payload is OAuthToken => {
  return has(payload, ["access_token"]);
};

export { isAccessToken, isErrorMessage };
