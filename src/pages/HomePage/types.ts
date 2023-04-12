import type { Meetings } from "../../services/zoom/types";

export type UseMeetings = () => {
  isLoading: boolean,
  meetings: Meetings["meetings"],
};