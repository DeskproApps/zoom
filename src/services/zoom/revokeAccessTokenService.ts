import { baseRequest } from "./baseRequest";
import { ACCESS_TOKEN } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const revokeAccessTokenService = (client: IDeskproClient) => {
  return baseRequest(client, {
    rawUrl: "https://zoom.us/oauth/revoke",
    method: "POST",
    queryParams: `?token=${ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic __client_id+':'+client_secret.base64__",
    },
  });
};

export { revokeAccessTokenService };
