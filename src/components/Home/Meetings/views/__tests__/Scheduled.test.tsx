import { act, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Scheduled } from "../Scheduled";
import { render } from "../../../../../../testing";
import mockScheduledMeeting from "../../../../../../testing/mocks/mockScheduledMeeting.json";

describe("Scheduled", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findByText } = render(
      <Scheduled
        meeting={mockScheduledMeeting as never}
        onInsertLink={jest.fn()}
        onDelete={mockOnDelete}
      />,
      { wrappers: { theme: true } },
    );

    expect(await findByText(/Schedule Meeting/i)).toBeInTheDocument();
    expect(await findByText(/08 Apr, 2023 15:01/i)).toBeInTheDocument();
    expect(await findByText(/Scheduled/i)).toBeInTheDocument();
    expect(await findByText(/16 Apr, 2023 15:00/i)).toBeInTheDocument();
  });

  test("should delete meeting", async () => {
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findByRole } = render(
      <Scheduled
        meeting={mockScheduledMeeting as never}
        onInsertLink={jest.fn()}
        onDelete={mockOnDelete}
      />,
      { wrappers: { theme: true } },
    );

    const deleteButton = await findByRole("button", { name: "Delete" });

    await act(async () => {
      await userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });
});
