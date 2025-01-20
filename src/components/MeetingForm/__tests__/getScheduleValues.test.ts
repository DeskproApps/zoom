import { getScheduleValues } from "../utils";
import type { FormValues } from "../types";

describe("getScheduleValues", () => {
  test("should return value for creation schedule meeting", () => {
    expect(getScheduleValues({
      recurring: false,
      topic: "test",
      timezone: "Europe/Kiev",
      datetime: new Date("2021-01-01T00:00:00.000Z"),
    } satisfies Partial<FormValues>)).toStrictEqual({
      type: 2,
      topic: "test",
      timezone: "Europe/Kiev",
      start_time: "2021-01-01T00:00:00.000Z",
    });
  });

  test("should return value for creation daily recurring meeting", () => {
    expect(getScheduleValues({
      recurring: true,
      topic: "test",
      timezone: "Europe/London",
      datetime: new Date("2021-01-01T00:00:00.000Z"),
      recurringType: 1,
      repeatInterval: 2,
      endDatetime: new Date("2023-12-31T00:00:00.000Z"),
    } satisfies Partial<FormValues>)).toStrictEqual({
      type: 8,
      topic: "test",
      timezone: "Europe/London",
      start_time: "2021-01-01T00:00:00.000Z",
      recurrence: {
        type: 1,
        repeat_interval: 2,
        end_date_time: "2023-12-31T00:00:00.000Z",
      },
    });
  });

  test("should return value for creation weekly recurring meeting", () => {
    expect(getScheduleValues({
      recurring: true,
      topic: "test",
      timezone: "Europe/London",
      datetime: new Date("2021-01-01T00:00:00.000Z"),
      recurringType: 2,
      repeatInterval: 1,
      endDatetime: new Date("2023-12-31T00:00:00.000Z"),
      occursWeekly: [2, 3, 5, 6],
    } satisfies Partial<FormValues>)).toStrictEqual({
      type: 8,
      topic: "test",
      timezone: "Europe/London",
      start_time: "2021-01-01T00:00:00.000Z",
      recurrence: {
        type: 2,
        repeat_interval: 1,
        weekly_days: "2,3,5,6",
        end_date_time: "2023-12-31T00:00:00.000Z",
      },
    });
  });

  test("should return value for creation monthly recurring meeting", () => {
    expect(getScheduleValues({
      recurring: true,
      topic: "test",
      timezone: "Europe/London",
      datetime: new Date("2021-01-01T00:00:00.000Z"),
      recurringType: 3,
      repeatInterval: 1,
      endDatetime: new Date("2023-12-31T00:00:00.000Z"),
      occursMonthly: 2,
    })).toStrictEqual({
      type: 8,
      topic: "test",
      timezone: "Europe/London",
      start_time: "2021-01-01T00:00:00.000Z",
      recurrence: {
        type: 3,
        repeat_interval: 1,
        end_date_time: "2023-12-31T00:00:00.000Z",
        monthly_day: 2,
      },
    });
  });
});
