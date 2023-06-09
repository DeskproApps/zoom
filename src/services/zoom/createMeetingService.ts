import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MeetingItem, MeetingTypes, Recurrence, MeetingDetails } from "./types";

type Data = {
  type: MeetingTypes,
  topic?: MeetingItem["topic"],
  timezone?: MeetingItem["timezone"],
  start_time?: MeetingItem["start_time"],
  recurrence?: Recurrence,
};

const createMeetingService = (client: IDeskproClient, data: Data) => {
  return baseRequest<MeetingDetails>(client, {
    url: "/users/me/meetings",
    method: "POST",
    data,
  });
};

export { createMeetingService };
