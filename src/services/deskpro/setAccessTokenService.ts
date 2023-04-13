import { TOKEN_PATH } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const setAccessTokenService = (client: IDeskproClient, accessToken: string) => {
  return client.setUserState(TOKEN_PATH, accessToken, { backend: true });
};

export { setAccessTokenService };
