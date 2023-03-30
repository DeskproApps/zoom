import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { OAuthToken, ZoomRestError } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  accessCode: string,
  callbackUrl: string
) => {
  return baseRequest<OAuthToken|ZoomRestError>(client, {
    rawUrl: `https://zoom.us/oauth/token`,
    method: "POST",
    queryParams: {
      grant_type: "authorization_code",
      code: accessCode,
      redirect_uri: callbackUrl,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic __client_id+':'+client_secret.base64__",
    }
  });
};

export { getAccessTokenService };
