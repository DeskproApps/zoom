import { occursMonthlyValidator } from "../utils";
import type { FormValues } from "../types";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(occursMonthlyValidator({ recurring: false, recurringType: 3 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 1 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 2 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(occursMonthlyValidator({
      recurring: true,
      recurringType: 3,
      occursMonthly: 1,
    } satisfies Partial<FormValues>)).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(occursMonthlyValidator({
      recurring: true,
      recurringType: 3,
      occursMonthly: 0,
    } satisfies Partial<FormValues>)).toBeFalsy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 3 } satisfies Partial<FormValues>)).toBeFalsy();
  });
});
