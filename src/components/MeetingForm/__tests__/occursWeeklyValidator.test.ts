import { occursWeeklyValidator } from "../utils";
import type { FormValues } from "../types";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(occursWeeklyValidator({} satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: false, recurringType: 2 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: true, recurringType: 1 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: true, recurringType: 3 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursWeeklyValidator({
      recurring: true,
      recurringType: 2,
      occursWeekly: [1],
    } satisfies Partial<FormValues>)).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(occursWeeklyValidator({
      recurring: true,
      recurringType: 2,
      occursWeekly: [],
    } satisfies Partial<FormValues>)).toBeFalsy();
  });
});
