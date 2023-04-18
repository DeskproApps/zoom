import { useCallback } from "react";
import get from "lodash.get";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryWithClient, useDeskproAppClient } from "@deskpro/app-sdk";
import { setInstantMeetingService } from "../../services/deskpro";
import { getMeetingsService, createMeetingService } from "../../services/zoom";
import { useAsyncError } from "../../hooks";
import { meeting } from "../../components/MeetingForm/types";
import { QueryKey } from "../../query";
import type { UseMeetings, UseCreateInstantMeeting } from "./types";

const useMeetings: UseMeetings = () => {
  const meetings = useQueryWithClient([QueryKey.MEETINGS, "me"], (client) =>
    getMeetingsService(client)
  );

  const instantMeetings = useQueryWithClient(
    [QueryKey.INSTANT_MEETINGS],
    (client) => client.getUserState("zoom/meetings/*")
  );

  return {
    isLoading: [meetings, instantMeetings].every(({ isLoading }) => isLoading),
    meetings: [
      ...get(instantMeetings, ["data"], []).map((meeting) => meeting.data),
      ...get(meetings, ["data", "meetings"], []),
    ],
  };
};

const useCreateInstantMeeting: UseCreateInstantMeeting = () => {
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();

  const createInstantMeeting = useCallback(() => {
    if (!client) {
      return Promise.resolve();
    }

    return createMeetingService(client, { type: meeting.INSTANT })
      .then((meeting) => setInstantMeetingService(client, meeting))
      .then(({ isSuccess, errors }) => {
        if (isSuccess) {
          return queryClient.invalidateQueries();
        } else {
          throw new Error(get(errors, [0]));
        }
      })
      .catch(asyncErrorHandler);
  }, [client, queryClient, asyncErrorHandler]);

  return { createInstantMeeting };
};

export { useMeetings, useCreateInstantMeeting };
