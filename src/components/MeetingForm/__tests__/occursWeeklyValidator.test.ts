import { occursWeeklyValidator } from "../utils";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(occursWeeklyValidator({})).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: false, recurringType: 2 })).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: true, recurringType: 1 })).toBeTruthy();
    expect(occursWeeklyValidator({ recurring: true, recurringType: 3 })).toBeTruthy();
    expect(occursWeeklyValidator({
      recurring: true,
      recurringType: 2,
      occursWeekly: [1],
    })).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(occursWeeklyValidator({
      recurring: true,
      recurringType: 2,
      occursWeekly: [],
    })).toBeFalsy();
  });
});
