import { repeatIntervalValidator } from "../utils";

describe("repeatIntervalValidator", () => {
  test("should validation successfully", () => {
    expect(repeatIntervalValidator({ recurringType: 0, repeatInterval: 0 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 1 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 10 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 15 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 1 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 7 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 12 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 1 } as any)).toBeTruthy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 3 } as any)).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 0 } as any)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 1, repeatInterval: 16 } as any)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 0 } as any)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 2, repeatInterval: 13 } as any)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 0 } as any)).toBeFalsy();
    expect(repeatIntervalValidator({ recurringType: 3, repeatInterval: 4 } as any)).toBeFalsy();
  });
});
