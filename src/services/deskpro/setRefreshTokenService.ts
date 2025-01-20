import { REFRESH_TOKEN_PATH } from "@/constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { OAuthToken } from "@/services/zoom/types";

const setRefreshTokenService = (client: IDeskproClient, { refresh_token }: OAuthToken) => {
  return client.setUserState(REFRESH_TOKEN_PATH, refresh_token, { backend: true });
};

export { setRefreshTokenService };
