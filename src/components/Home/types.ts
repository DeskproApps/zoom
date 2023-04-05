import type { Meeting } from "../../services/zoom/types";

export type Props = {
  meetings: Meeting[],
};

export type MeetingProps = {
  meeting: Meeting,
};
