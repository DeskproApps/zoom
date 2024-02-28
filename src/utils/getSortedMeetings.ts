import { get } from "lodash";
import isBefore from "date-fns/isBefore";
import type { MeetingItem, MeetingDetails } from "../services/zoom/types";

const getSortedMeetings = (
  scheduleMeetings?: MeetingItem[],
  recurrenceMeetings?: MeetingDetails[],
): Array<MeetingItem|MeetingDetails> => {
  return [
    ...scheduleMeetings || [],
    ...recurrenceMeetings || [],
  ].sort((a, b) => {
    const aStart = get(a, ["occurrences", 0, "start_time"], get(a, ["start_time"]));
    const bStart = get(b, ["occurrences", 0, "start_time"], get(b, ["start_time"]));

    return isBefore(new Date(aStart), new Date(bStart)) ? -1 : 1;
  });
};

export { getSortedMeetings };
