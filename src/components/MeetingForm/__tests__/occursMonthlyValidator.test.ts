import { occursMonthlyValidator } from "../utils";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(occursMonthlyValidator({ recurring: false, recurringType: 3 } as any)).toBeTruthy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 1 } as any)).toBeTruthy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 2 } as any)).toBeTruthy();
    expect(occursMonthlyValidator({
      recurring: true,
      recurringType: 3,
      occursMonthly: 1,
    } as any)).toBeTruthy();
  });

  test("should validation failed", () => {
    expect(occursMonthlyValidator({
      recurring: true,
      recurringType: 3,
      occursMonthly: 0,
    } as any)).toBeFalsy();
    expect(occursMonthlyValidator({ recurring: true, recurringType: 3 } as any)).toBeFalsy();
  });
});
