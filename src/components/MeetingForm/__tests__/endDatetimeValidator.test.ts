import { endDatetimeValidator } from "../utils";
import type { FormValues } from "../types";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(endDatetimeValidator({
      recurring: true,
      endDatetime: new Date("2023-04-01T08:30:00Z"),
    } satisfies Partial<FormValues>)).toBeTruthy();
    expect(endDatetimeValidator({ recurring: false, endDatetime: undefined } satisfies Partial<FormValues>)).toBeTruthy();
  });

  test.each([{}, [], "", 123, 0, false, true])("should validation failed %p", (value) => {
    expect(endDatetimeValidator({ recurring: true, endDatetime: value } as Partial<FormValues>)).toBeFalsy();
  });
});
