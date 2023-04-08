import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MeetingItem } from "./types";

const deleteMeetingService = (
  client: IDeskproClient,
  meetingId: MeetingItem["id"],
) => {
  return baseRequest<MeetingItem>(client, {
    url: `/meetings/${meetingId}`,
    method: "DELETE",
  });
};

export { deleteMeetingService };
