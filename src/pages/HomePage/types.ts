import type { MeetingItem, MeetingDetails } from "../../services/zoom/types";

export type UseMeetings = () => {
  isLoading: boolean,
  meetings: Array<MeetingItem|MeetingDetails>,
};

export type UseCreateInstantMeeting = () => {
  createInstantMeeting: () => Promise<void>,
};
