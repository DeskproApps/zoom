import type { Meetings } from "../../services/zoom/types";

export type UseMeetings = () => {
  isLoading: boolean,
  meetings: Meetings["meetings"],
};

export type UseCreateInstantMeeting = () => {
  error: string|string[]|null,
  createInstantMeeting: () => Promise<void>,
};
