import type { IDeskproClient } from "@deskpro/app-sdk";

const getInstantMeetingsService = (client: IDeskproClient) => {
  return client.getUserState("zoom/meetings/*");
};

export { getInstantMeetingsService };
