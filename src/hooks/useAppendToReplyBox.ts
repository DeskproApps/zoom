import { useCallback } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import type { MeetingItem } from "../services/zoom/types";

type UseAppendToReplyBox = () => {
  insertInviteIntoReplyBox: (meeting: MeetingItem) => Promise<void>,
};

const useAppendToReplyBox: UseAppendToReplyBox = () => {
  const { client } = useDeskproAppClient();

  const insertInviteIntoReplyBox = useCallback((meeting: MeetingItem) => {
    if (!client) {
      return Promise.resolve();
    }

    const url = new URL(meeting.join_url);

    return client.deskpro().appendContentToActiveTicketReplyBox("Zoom Meeting invitation\n")
      .then(() => client.deskpro().appendLinkToActiveTicketReplyBox(`${meeting.id}`, `${meeting.id}\n\n`))
      .then(() => client.deskpro().appendContentToActiveTicketReplyBox("Click the link below to join the Zoom Meeting:\n"))
      .then(() => client.deskpro().appendLinkToActiveTicketReplyBox(meeting.join_url, `${url.origin}${url.pathname}\n`));
  }, [client]);

  return { insertInviteIntoReplyBox };
};

export { useAppendToReplyBox };
