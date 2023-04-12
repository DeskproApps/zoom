import { Home } from "../Home";
import { getMeetingService } from "../../../services/zoom";
import { render } from "../../../../testing";
import mockMeetings from "../../../../testing/mocks/mockMeetings.json";
import mockMeeting84350791442 from "../../../../testing/mocks/mockMeeting84350791442.json";
import mockMeeting87605567807 from "../../../../testing/mocks/mockMeeting87605567807.json";
import type { MeetingItem } from "../../../services/zoom/types";

jest.mock("../../../services/zoom/getMeetingService");

describe("Home", () => {
  test("render", async () => {
    (getMeetingService as jest.Mock)
      .mockResolvedValueOnce(mockMeeting84350791442)
      .mockResolvedValueOnce(mockMeeting87605567807);

    const { findByText } = render(
      <Home meetings={mockMeetings.meetings as MeetingItem[]} />,
      { wrappers: { theme: true, query: true } },
    );

    expect(await findByText(/Retrospective Meeting/i)).toBeInTheDocument();
    expect(await findByText(/All-Hands Engineering Stand Up/i)).toBeInTheDocument();
    expect(await findByText(/Apps Stand Up/i)).toBeInTheDocument();
  });
});
