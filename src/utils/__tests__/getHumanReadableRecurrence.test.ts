import { getHumanReadableRecurrence } from "../getHumanReadableRecurrence";
import type { Recurrence } from "@/services/zoom/types";

const emptyRecurrence: Recurrence = {};
const everyDay: Recurrence = { type: 1, repeat_interval: 1, end_date_time: "2023-07-07T12:15:00Z" };
const every3Days: Recurrence = { ...everyDay, repeat_interval: 3 };
const everyWeek: Recurrence = { ...everyDay, type: 2, repeat_interval: 1, weekly_days: "3" };
const every3Weeks: Recurrence = { ...everyWeek, repeat_interval: 3 };
const everyWeeks3Times: Recurrence = { ...everyWeek, weekly_days: "3,5,1" };
const everyMonth: Recurrence = { ...everyDay, type: 3, monthly_day: 9 };
const every2Months: Recurrence = { ...everyMonth, repeat_interval: 2, monthly_day: 1 };

describe("getHumanReadableRecurrence", () => {
  test.each([
    [emptyRecurrence, "-"],
    [everyDay, "Every day"],
    [every3Days, "Every 3 days"],
    [everyWeek, "Every week on Tue"],
    [every3Weeks, "Every 3 weeks on Tue"],
    [everyWeeks3Times, "Every week on Tue, Thu, Sun"],
    [everyMonth, "Every month"],
    [every2Months, "Every 2 months"],
  ])("should %p", (receive, expected) => {
    expect(getHumanReadableRecurrence(receive)).toStrictEqual(expected);
  });
});
