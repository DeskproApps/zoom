import get from "lodash.get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getMeetingsService } from "../../services/zoom";
import { QueryKey } from "../../query";
import type { UseMeetings } from "./types";

const useMeetings: UseMeetings = () => {
  const meetings = useQueryWithClient(
    [QueryKey.MEETINGS, "me"],
    (client) => getMeetingsService(client),
  );

  const instantMeetings = useQueryWithClient(
    [QueryKey.INSTANT_MEETINGS],
    (client) => client.getUserState("zoom/meetings/*"),
  );

  return {
    isLoading: [meetings, instantMeetings].every(({ isLoading }) => isLoading),
    meetings: [
      ...get(instantMeetings, ["data"], []).map((meeting) => meeting.data),
      ...get(meetings, ["data", "meetings"], []),
    ],
  };
};

export { useMeetings };
