import get from "lodash.get";
import type { MeetingItem, MeetingDetails } from "../services/zoom/types";

const isInstantMeeting = (meeting?: MeetingItem|MeetingDetails): boolean => {
  return get(meeting, ["type"]) === 1;
};

export { isInstantMeeting };
