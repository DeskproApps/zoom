import { getTimeZoneOptions } from "../getTimeZoneOptions";

jest.mock("../timezones.json", () => (["Europe/London", "Europe/Kiev"]))

describe("getTimeZoneOptions", () => {
  test("should return timezone options", () => {
    expect(getTimeZoneOptions()).toStrictEqual([
      { label: "Europe/London", value: "Europe/London", key: "Europe/London", type: "value" },
      { label: "Europe/Kiev", value: "Europe/Kiev", key: "Europe/Kiev", type: "value" },
    ]);
  });
});
