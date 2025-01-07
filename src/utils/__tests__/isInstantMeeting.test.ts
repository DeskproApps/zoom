import { isInstantMeeting } from "../isInstantMeeting";
import {
  mockInstantMeeting,
  mockScheduledMeeting,
  mockRecurringMeeting84350791442 as mockRecurringMeeting,
} from "@/testing/mocks";

describe("getOption", () => {
  test("should truthy if instant meeting", () => {
    expect(isInstantMeeting(mockInstantMeeting as never)).toBeTruthy();
  });

  test("should falsy if recurring or scheduled meeting", () => {
    expect(isInstantMeeting(mockScheduledMeeting as never)).toBeFalsy();
    expect(isInstantMeeting(mockRecurringMeeting as never)).toBeFalsy();
  });

  test("should falsy if pass the empty value", () => {
    expect(isInstantMeeting()).toBeFalsy();
  });

  test.each([
    undefined, null, 0, false, true, 1, "", "string", {}, [], [1, 2, 3],
  ])("should false if pass the wrong value: %p", (value) => {
    expect(isInstantMeeting(value as never)).toBeFalsy();
  });
});
