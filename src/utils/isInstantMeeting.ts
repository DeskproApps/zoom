import type { MeetingItem, MeetingDetails } from "../services/zoom/types";

const isInstantMeeting = (meeting?: MeetingItem|MeetingDetails): boolean => {
  return meeting?.type === 1;
};

export { isInstantMeeting };
