import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { User } from "./types";

type Data = {
  topic: string,
  timezone: string,
  datetime: string,
};

const createMeetingService = (client: IDeskproClient, data: Data) => {
  return baseRequest<User>(client, {
    url: "/users/me/meetings",
    method: "POST",
    data,
  });
};

export { createMeetingService };
