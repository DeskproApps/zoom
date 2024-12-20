import { Home } from "@/components/Home";
import { getMeetingService } from "@/services/zoom";
import {
  render,
  mockMeetings,
  mockRecurringMeeting84350791442 as mockMeeting84350791442,
  mockRecurringMeeting87605567807 as mockMeeting87605567807,
} from "@/testing";
import type { MeetingItem } from "@/services/zoom/types";

jest.mock("@/services/zoom/getMeetingService");

describe("Home", () => {
  test.skip("render", async () => {
    (getMeetingService as jest.Mock)
      .mockResolvedValueOnce(mockMeeting84350791442)
      .mockResolvedValueOnce(mockMeeting87605567807);

    const { findByText } = render(
      <Home
        meetings={mockMeetings.meetings as MeetingItem[]}
        onInsertLink={jest.fn()}
        onCreateInstant={jest.fn()}
        onDeleteMeeting={jest.fn()}
        onCreateSchedule={jest.fn()}
      />,
      { wrappers: { theme: true } },
    );

    expect(await findByText(/Retrospective Meeting/i)).toBeInTheDocument();
    expect(await findByText(/All-Hands Engineering Stand Up/i)).toBeInTheDocument();
    expect(await findByText(/Apps Stand Up/i)).toBeInTheDocument();
  });
});
