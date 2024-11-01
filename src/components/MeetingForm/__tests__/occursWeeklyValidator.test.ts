import { occursWeeklyValidator } from "../utils";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(occursWeeklyValidator({} as any)).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: false, recurringType: 2 } as any)).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: true, recurringType: 1 } as any)).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: true, recurringType: 3 } as any)).toBeTruthy();
    expect(occursWeeklyValidator({
      recurring: true,
      recurringType: 2,
      occursWeekly: [1],
    } as any)).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(occursWeeklyValidator({
      recurring: true,
      recurringType: 2,
      occursWeekly: [],
    } as any)).toBeFalsy();
  });
});
