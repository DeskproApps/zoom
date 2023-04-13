import { occursMonthlyValidator } from "../utils";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(occursMonthlyValidator({ recurring: false, recurringType: 3 })).toBeTruthy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 1 })).toBeTruthy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 2 })).toBeTruthy();
    expect(occursMonthlyValidator({
      recurring: true,
      recurringType: 3,
      occursMonthly: 1,
    })).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(occursMonthlyValidator({
      recurring: true,
      recurringType: 3,
      occursMonthly: 0,
    })).toBeFalsy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 3 })).toBeFalsy();
  });
});
