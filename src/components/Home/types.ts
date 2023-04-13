import type { MeetingItem } from "../../services/zoom/types";

export type Props = {
  meetings: MeetingItem[],
  onCreateInstant: () => Promise<void>,
  onCreateSchedule: () => void,
  onDeleteMeeting: (meeting: MeetingItem) => Promise<void>,
  error?: string|string[]|null,
};

export type MeetingProps = {
  meeting: MeetingItem,
  onDelete: Props["onDeleteMeeting"],
};
