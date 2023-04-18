import { baseRequest } from "./baseRequest";
import { REFRESH_TOKEN } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { OAuthToken } from "./types";

const refreshTokenService = (client: IDeskproClient) => {
  return baseRequest<OAuthToken>(client, {
    rawUrl: "https://zoom.us/oauth/token",
    method: "POST",
    queryParams: {
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic __client_id+':'+client_secret.base64__",
    },
  });
};

export { refreshTokenService };
