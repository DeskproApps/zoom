import type { IDeskproClient } from "@deskpro/app-sdk";

const deleteInstantMeetingService = (client: IDeskproClient, meetingId: string) => {
  return client.deleteUserState(`zoom/meetings/${meetingId}`);
};

export { deleteInstantMeetingService };
