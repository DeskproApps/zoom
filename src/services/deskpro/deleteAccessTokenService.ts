import { TOKEN_PATH } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const deleteAccessTokenService = (client: IDeskproClient) => {
  return client.deleteUserState(TOKEN_PATH);
};

export { deleteAccessTokenService };
