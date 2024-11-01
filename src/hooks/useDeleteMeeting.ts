import { useCallback } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useAsyncError } from "@/hooks";
import { isInstantMeeting } from "@/utils";
import { deleteInstantMeetingService } from "@/services/deskpro";
import { deleteMeetingService } from "@/services/zoom";
import { queryClient } from "@/query";
import type { MeetingItem, MeetingDetails } from "@/services/zoom/types";

type useDeleteMeeting = () => {
  deleteMeeting: () => Promise<void>;
};

const useDeleteMeeting = () => {
  const { asyncErrorHandler } = useAsyncError();
  const { client } = useDeskproAppClient();

  const deleteMeeting = useCallback(
    (meeting?: MeetingItem|MeetingDetails): Promise<void> => {
      if (!client || meeting === undefined) {
        return Promise.reject();
      }

      const isInstant = isInstantMeeting(meeting);

      return (
        isInstant
          ? deleteInstantMeetingService(client, `zoom/meetings/${meeting.id}`)
          : Promise.resolve()
      )
        .then(() => deleteMeetingService(client, meeting.id))
        .then(() => queryClient.invalidateQueries())
        .catch(asyncErrorHandler);
    },
    [client, asyncErrorHandler]
  );

  return { deleteMeeting };
};

export { useDeleteMeeting };
