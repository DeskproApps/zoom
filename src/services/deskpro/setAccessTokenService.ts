import { ACCESS_TOKEN_PATH } from "@/constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const setAccessTokenService = (client: IDeskproClient, access_token: string) => {
  return client.setUserState(ACCESS_TOKEN_PATH, access_token, { backend: true });
};

export { setAccessTokenService };
