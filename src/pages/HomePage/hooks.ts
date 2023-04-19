import { useCallback } from "react";
import get from "lodash.get";
import size from "lodash.size";
import isEmpty from "lodash.isempty";
import isBefore from "date-fns/isBefore";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryWithClient, useDeskproAppClient } from "@deskpro/app-sdk";
import { setInstantMeetingService } from "../../services/deskpro";
import {
  getMeetingService,
  getMeetingsService,
  createMeetingService,
} from "../../services/zoom";
import { useAsyncError, useQueriesWithClient } from "../../hooks";
import { MeetingTypeMap } from "../../services/zoom/types";
import { QueryKey } from "../../query";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MeetingItem } from "../../services/zoom/types";
import type { UseMeetings, UseCreateInstantMeeting } from "./types";

const useMeetings: UseMeetings = () => {
  const meetings = useQueryWithClient([QueryKey.MEETINGS, "me"], (client) =>
    getMeetingsService(client)
  );

  const instantMeetings = useQueryWithClient(
    [QueryKey.INSTANT_MEETINGS],
    (client) => client.getUserState("zoom/meetings/*")
  );

  const scheduleMeetings = (get(meetings, ["data", "meetings"], []))
    .filter((m: MeetingItem) => m.type === MeetingTypeMap.SCHEDULE);

  const recurrenceMeetingIds = (get(meetings, ["data", "meetings"], []))
    .filter((m: MeetingItem) => m.type === MeetingTypeMap.RECURRING)
    .map((m: MeetingItem) => m.id);

  const recurrenceMeetings = useQueriesWithClient(recurrenceMeetingIds.map((id: MeetingItem["id"]) => ({
    queryKey: [QueryKey.MEETINGS, id],
    queryFn: (client: IDeskproClient) => getMeetingService(client, id),
    enabled: size(recurrenceMeetingIds) > 0,

  })));

  return {
    isLoading: [meetings, instantMeetings, ...recurrenceMeetings].every(({ isLoading }) => isLoading),
    meetings: [
      ...get(instantMeetings, ["data"], []).map((meeting) => meeting.data),
      ...[
        ...scheduleMeetings,
        ...recurrenceMeetings.map((m) => get(m, ["data"])).filter((m) => !isEmpty(m)),
      ].sort((a, b) => {
        const aStart = get(a, ["occurrences", 0, "start_time"]) || a.start_time;
        const bStart = get(b, ["occurrences", 0, "start_time"]) || b.start_time;

        return isBefore(new Date(aStart), new Date(bStart)) ? -1 : 1;
      }),
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

    return createMeetingService(client, { type: MeetingTypeMap.INSTANT })
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
