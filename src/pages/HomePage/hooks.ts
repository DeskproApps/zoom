import { useMemo, useCallback } from "react";
import { get, size, isEmpty, uniq, flatten } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryWithClient, useDeskproAppClient } from "@deskpro/app-sdk";
import {
  setInstantMeetingService,
  getInstantMeetingsService,
} from "../../services/deskpro";
import {
  getMeetingService,
  getMeetingsService,
  createMeetingService,
} from "../../services/zoom";
import { useAsyncError, useQueriesWithClient } from "../../hooks";
import { getSortedMeetings } from "../../utils";
import { MeetingTypeMap } from "../../services/zoom/types";
import { QueryKey } from "../../query";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { MeetingItem, MeetingDetails } from "../../services/zoom/types";
import type { UseMeetings, UseCreateInstantMeeting } from "./types";

const useMeetings: UseMeetings = () => {
  const meetings = useQueryWithClient([QueryKey.MEETINGS, "me"], (client) =>
    getMeetingsService(client)
  );

  const instantMeetings = useQueryWithClient(
    [QueryKey.INSTANT_MEETINGS],
    (client) => getInstantMeetingsService(client),
  );

  const scheduleMeetings = (get(meetings, ["data", "meetings"], []))
    .filter((m: MeetingItem) => m.type === MeetingTypeMap.SCHEDULE);

  const recurrenceMeetingIds = uniq((get(meetings, ["data", "meetings"], []))
    .filter((m: MeetingItem) => m.type === MeetingTypeMap.RECURRING)
    .map((m: MeetingItem) => m.id));

  const recurrenceMeetingsData = useQueriesWithClient(recurrenceMeetingIds.map((id: MeetingItem["id"]) => ({
    queryKey: [QueryKey.MEETINGS, id],
    queryFn: (client: IDeskproClient) => getMeetingService(client, id),
    enabled: size(recurrenceMeetingIds) > 0,
    useErrorBoundary: false,
  })));

  const recurrenceMeetings: MeetingDetails[] = useMemo(() => flatten(recurrenceMeetingsData
    .map<MeetingDetails>((m) => get(m as never, ["data"]))
    .filter((m?: MeetingDetails) => !isEmpty(m))
    .map((m) => m?.occurrences?.map((o) => ({
        ...m,
        id: Number(o.occurrence_id),
        start_time: o.start_time,
      }))
    )), [recurrenceMeetingsData]);

  return {
    isLoading: [meetings, instantMeetings, ...recurrenceMeetingsData].every(({ isLoading }) => isLoading),
    meetings: [
      ...get(instantMeetings, ["data"], []).map((meeting) => meeting.data) as MeetingItem[],
      ...getSortedMeetings(
        scheduleMeetings,
        recurrenceMeetings,
      ),
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
