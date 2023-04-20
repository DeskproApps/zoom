import type { MeetingItem, MeetingDetails } from "../../services/zoom/types";

export type Props = {
  meetings: Array<MeetingItem|MeetingDetails>,
  onCreateInstant: () => Promise<void>,
  onCreateSchedule: () => void,
  onDeleteMeeting: (meeting: MeetingItem|MeetingDetails) => Promise<void>,
  onInsertLink: (meeting: MeetingItem|MeetingDetails) => void,
  error?: string|string[]|null,
};

export type MeetingProps = {
  meeting: MeetingItem|MeetingDetails,
  onDelete: Props["onDeleteMeeting"],
  onInsertLink: Props["onInsertLink"],
};
