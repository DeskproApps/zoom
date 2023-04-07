import type { MeetingItem } from "../../services/zoom/types";

export type Props = {
  meetings: MeetingItem[],
  onCreateInstant: () => void,
};

export type MeetingProps = {
  meeting: MeetingItem,
};
