import { endDatetimeValidator } from "../utils";

describe("endDatetimeValidator", () => {
  test("should validation successfully", () => {
    expect(endDatetimeValidator({
      recurring: true,
      endDatetime: new Date("2023-04-01T08:30:00Z"),
    })).toBeTruthy();
    expect(endDatetimeValidator({ recurring: false, endDatetime: "" })).toBeTruthy();
  });

  test.each([{}, [], "", 123, 0, false, true])("should validation failed %p", (value) => {
    expect(endDatetimeValidator({ recurring: true, endDatetime: value })).toBeFalsy();
  });
});
