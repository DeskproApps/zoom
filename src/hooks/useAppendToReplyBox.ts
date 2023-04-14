import { useCallback } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { nbsp } from "../constants";
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

    return client.deskpro().appendContentToActiveTicketReplyBox(`Zoom Meeting invitation. `)
      .then(() => client.deskpro().appendContentToActiveTicketReplyBox(`Meeting ID:${nbsp}${meeting.id}. `))
      .then(() => client.deskpro().appendContentToActiveTicketReplyBox(`Click the link below to join the Zoom Meeting:${nbsp}`))
      .then(() => client.deskpro().appendLinkToActiveTicketReplyBox(meeting.join_url, `${url.origin}${url.pathname}`));
  }, [client]);

  return { insertInviteIntoReplyBox };
};

export { useAppendToReplyBox };
