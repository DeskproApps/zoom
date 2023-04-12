import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Meetings } from "./types";

const getMeetingsService = (client: IDeskproClient) => {
  return baseRequest<Meetings>(client, {
    url: `/users/me/meetings?page_size=100`,
  });
};

export { getMeetingsService };
