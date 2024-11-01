import { ACCESS_TOKEN_PATH } from "@/constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { OAuthToken } from "@/services/zoom/types";

const setAccessTokenService = (client: IDeskproClient, { access_token }: OAuthToken) => {
  return client.setUserState(ACCESS_TOKEN_PATH, access_token, { backend: true });
};

export { setAccessTokenService };
