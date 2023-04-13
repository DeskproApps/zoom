import { repeatIntervalValidator } from "../utils";

describe("repeatIntervalValidator", () => {
  test("should validation successfully", () => {
    expect(repeatIntervalValidator({ recurringType: 0, repeatInterval: 0 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 1 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 10 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 15 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 1 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 7 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 12 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 1 })).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 3 })).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 0 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 16 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 0 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 13 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 0 })).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 4 })).toBeFalsy();
  });
});
