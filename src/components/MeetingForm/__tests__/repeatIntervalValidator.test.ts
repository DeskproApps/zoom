import { repeatIntervalValidator } from "../utils";
import type { FormValues } from "../types";

describe("repeatIntervalValidator", () => {
  test("should validation successfully", () => {
    expect(repeatIntervalValidator({ recurringType: 0, repeatInterval: 0 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 1 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 10 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 15 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 1 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 7 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 12 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 1 } satisfies Partial<FormValues>)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 3 } satisfies Partial<FormValues>)).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 0 } satisfies Partial<FormValues>)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 16 } satisfies Partial<FormValues>)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 0 } satisfies Partial<FormValues>)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 13 } satisfies Partial<FormValues>)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 0 } satisfies Partial<FormValues>)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 4 } satisfies Partial<FormValues>)).toBeFalsy();
  });
});
