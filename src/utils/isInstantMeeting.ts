import get from "lodash.get";
import type { MeetingItem } from "../services/zoom/types";

const isInstantMeeting = (meeting?: MeetingItem): boolean => {
  return get(meeting, ["type"]) === 1;
};

export { isInstantMeeting };
