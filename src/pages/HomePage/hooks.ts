import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getMeetingsService } from "../../services/zoom";
import { QueryKey } from "../../query";
import type { UseMeetings } from "./types";

const useMeetings: UseMeetings = () => {
  const meetings = useQueryWithClient(
    [QueryKey.MEETINGS, "me"],
    (client) => getMeetingsService(client),
  );

  return {
    isLoading: [meetings].every(({ isLoading }) => isLoading),
    meetings: get(meetings, ["data", "meetings"], []),
  };
};

export { useMeetings };
