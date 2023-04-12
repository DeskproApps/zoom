import { useState, useCallback } from "react";
import get from "lodash/get";
import { useQueryClient } from "@tanstack/react-query";
import {
  useQueryWithClient,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { setInstantMeetingService } from "../../services/deskpro";
import {
  getMeetingsService,
  createMeetingService,
} from "../../services/zoom";
import { meeting } from "../../components/MeetingForm/types";
import { QueryKey } from "../../query";
import type { UseMeetings, UseCreateInstantMeeting } from "./types";

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

const useCreateInstantMeeting: UseCreateInstantMeeting = () => {
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<string|string[]|null>(null);

  const createInstantMeeting = useCallback(() => {
    if (!client) {
      return Promise.resolve();
    }

    setError(null);

    return createMeetingService(client, { type: meeting.INSTANT })
      .then((meeting) => setInstantMeetingService(client, meeting))
      .then(({ isSuccess, errors }) => {
        if (isSuccess) {
          return queryClient.invalidateQueries();
        } else {
          setError(errors);
          return Promise.resolve();
        }
      })
      .catch((err) => {
        // ToDo: handle error
        // eslint-disable-next-line no-console
        console.error("zoom create:", err);
      });
  }, [client, queryClient]);

  return { error, createInstantMeeting };
};

export { useMeetings, useCreateInstantMeeting };
