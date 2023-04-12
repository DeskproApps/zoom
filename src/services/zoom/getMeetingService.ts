import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MeetingDetails } from "./types";

const getMeetingService = (
  client: IDeskproClient,
  meetingId: MeetingDetails["id"],
) => {
  return baseRequest<MeetingDetails>(client, {
    url: `/meetings/${meetingId}`,
  });
};

export { getMeetingService };
