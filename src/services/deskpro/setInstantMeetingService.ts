import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MeetingDetails } from "@/services/zoom/types";

const setInstantMeetingService = (
  client: IDeskproClient,
  meeting: MeetingDetails,
) => {
  return client.setUserState(`zoom/meetings/${meeting.id}`, meeting);
};

export { setInstantMeetingService };
