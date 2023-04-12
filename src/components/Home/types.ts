import type { MeetingItem } from "../../services/zoom/types";

export type Props = {
  meetings: MeetingItem[],
};

export type MeetingProps = {
  meeting: MeetingItem,
};
