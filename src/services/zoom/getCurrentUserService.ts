import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { User } from "./types";

const getCurrentUserService = (client: IDeskproClient) => {
  return baseRequest<User>(client, {
    url: "/users/me",
  });
};

export { getCurrentUserService };
