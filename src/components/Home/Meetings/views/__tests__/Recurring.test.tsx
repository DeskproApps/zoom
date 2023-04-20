import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getMeetingService } from "../../../../../services/zoom";
import { Recurring } from "../Recurring";
import { render } from "../../../../../../testing";
import mockRecurringMeeting from "../../../../../../testing/mocks/mockRecurringMeeting84350791442.json";

jest.mock("../../../../../services/zoom/getMeetingService");

describe("Recurring", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    (getMeetingService as jest.Mock).mockResolvedValueOnce(mockRecurringMeeting);
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findByText } = render(
      <Recurring
        meeting={mockRecurringMeeting as never}
        onInsertLink={jest.fn()}
        onDelete={mockOnDelete}
      />,
      { wrappers: { theme: true, query: true } },
    );

    expect(await findByText(/Apps Stand Up/i)).toBeInTheDocument();
    expect(await findByText(/04 Apr, 2023 17:00/i)).toBeInTheDocument();
    expect(await findByText(/Recurring/i)).toBeInTheDocument();
  });

  test("should delete meeting", async () => {
    (getMeetingService as jest.Mock).mockResolvedValueOnce(mockRecurringMeeting);
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findByRole } = render(
      <Recurring
        meeting={mockRecurringMeeting as never}
        onInsertLink={jest.fn()}
        onDelete={mockOnDelete}
      />,
      { wrappers: { theme: true, query: true } },
    );

    const deleteButton = await findByRole("button", { name: "Delete" });

    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });

  test("should inserting invitation into reply box", async () => {
    (getMeetingService as jest.Mock).mockResolvedValueOnce(mockRecurringMeeting);
    const mockOnInsertLink = jest.fn();
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findByRole } = render(
      <Recurring
        meeting={mockRecurringMeeting as never}
        onInsertLink={mockOnInsertLink}
        onDelete={mockOnDelete}
      />,
      { wrappers: { theme: true, query: true } },
    );

    const insertButton = await findByRole("button", { name: "Insert Link" });

    await userEvent.click(insertButton);

    await waitFor(() => {
      expect(mockOnInsertLink).toHaveBeenCalled();
    });
  });
});
