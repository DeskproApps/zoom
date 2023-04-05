import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Meeting, Meetings } from "./types";

const getMeetingService = (
  client: IDeskproClient,
  meetingId: Meeting["id"],
) => {
  return baseRequest<Meetings>(client, {
    url: `/meetings/${meetingId}`,
  });
};

export { getMeetingService };
