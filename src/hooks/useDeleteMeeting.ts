import { useCallback } from "react";
import has from "lodash/has";
import { useQueryClient } from "@tanstack/react-query";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { isInstantMeeting } from "../utils";
import { deleteInstantMeetingService } from "../services/deskpro";
import { deleteMeetingService } from "../services/zoom";
import type { MeetingItem } from "../services/zoom/types";

type useDeleteMeeting = () => {
  deleteMeeting: () => Promise<void>,
};

const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();

  const deleteMeeting = useCallback((meeting: MeetingItem): Promise<void> => {
    if (!client || !has(meeting, ["id"])) {
      return Promise.reject();
    }

    const isInstant = isInstantMeeting(meeting);

    return (isInstant
        ? deleteInstantMeetingService(client, `zoom/meetings/${meeting.id}`)
        : Promise.resolve()
    )
      .then(() => deleteMeetingService(client, meeting.id))
      .then(() => queryClient.invalidateQueries())
      .catch((err) => {
        // ToDo: handle error and write tests
        // eslint-disable-next-line no-console
        console.error("zoom create:", err);
      });
  }, [client, queryClient]);

  return { deleteMeeting };
};

export { useDeleteMeeting };
