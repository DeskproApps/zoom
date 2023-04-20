import { getSortedMeetings } from "../getSortedMeetings";

const scheduleMeetings = [
  { "id": 83630754498, "type": 2, "start_time": "2023-04-13T12:00:00Z" },
  { "id": 84291027900, "type": 2, "start_time": "2023-04-20T03:30:00Z" },
  { "id": 85003615130, "type": 2, "start_time": "2023-04-20T08:00:00Z" },
  { "id": 86054549781, "type": 2, "start_time": "2023-04-20T09:00:00Z" },
  { "id": 82610776140, "type": 2, "start_time": "2023-04-20T10:00:00Z" },
  { "id": 84996130822, "type": 2, "start_time": "2023-04-20T11:00:00Z" },
  { "id": 81937269014, "type": 2, "start_time": "2023-04-20T14:00:00Z" },
  { "id": 84215220181, "type": 2, "start_time": "2023-04-20T15:00:00Z" },
  { "id": 82760299902, "type": 2, "start_time": "2023-04-21T11:00:00Z" },
  { "id": 86996273477, "type": 2, "start_time": "2023-04-30T19:00:00Z" },
];

const recurrenceMeetings = [
  { "id": 85491330774, "type": 8, "occurrences": [{ "start_time": "2023-04-20T10:00:00Z" }]},
  { "id": 82389608498, "type": 8, "occurrences": [{ "start_time": "2023-04-20T12:00:00Z" }]},
  { "id": 82407967084, "type": 8, "occurrences": [{ "start_time": "2023-04-26T18:00:00Z" }]},
  { "id": 89798407056, "type": 8, "occurrences": [{ "start_time": "2023-05-14T12:00:00Z" }]},
  { "id": 85782231562, "type": 8, "occurrences": [{ "start_time": "2023-05-16T10:00:00Z" }]},
];

describe("getSortedMeetings", () => {
  test("should return empty array", () => {
    expect(getSortedMeetings()).toEqual([]);
  });

  test("should sorted", () => {
    expect(getSortedMeetings(scheduleMeetings as never, recurrenceMeetings as never))
      .toEqual([
        { "id": 83630754498, "type": 2, "start_time": "2023-04-13T12:00:00Z" },
        { "id": 84291027900, "type": 2, "start_time": "2023-04-20T03:30:00Z" },
        { "id": 85003615130, "type": 2, "start_time": "2023-04-20T08:00:00Z" },
        { "id": 86054549781, "type": 2, "start_time": "2023-04-20T09:00:00Z" },
        { "id": 82610776140, "type": 2, "start_time": "2023-04-20T10:00:00Z" },
        { "id": 85491330774, "type": 8, "occurrences": [{ "start_time": "2023-04-20T10:00:00Z" }]},
        { "id": 84996130822, "type": 2, "start_time": "2023-04-20T11:00:00Z" },
        { "id": 82389608498, "type": 8, "occurrences": [{ "start_time": "2023-04-20T12:00:00Z" }]},
        { "id": 81937269014, "type": 2, "start_time": "2023-04-20T14:00:00Z" },
        { "id": 84215220181, "type": 2, "start_time": "2023-04-20T15:00:00Z" },
        { "id": 82760299902, "type": 2, "start_time": "2023-04-21T11:00:00Z" },
        { "id": 82407967084, "type": 8, "occurrences": [{ "start_time": "2023-04-26T18:00:00Z" }]},
        { "id": 86996273477, "type": 2, "start_time": "2023-04-30T19:00:00Z" },
        { "id": 89798407056, "type": 8, "occurrences": [{ "start_time": "2023-05-14T12:00:00Z" }]},
        { "id": 85782231562, "type": 8, "occurrences": [{ "start_time": "2023-05-16T10:00:00Z" }]},
      ]);
  });
});
