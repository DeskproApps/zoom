import type { MeetingItem } from "../../services/zoom/types";

export type Props = {
  meetings: MeetingItem[],
  onCreateInstant: () => void,
  onDeleteMeeting: (meeting: MeetingItem) => Promise<void>,
};

export type MeetingProps = {
  meeting: MeetingItem,
  onDelete: Props["onDeleteMeeting"],
};
