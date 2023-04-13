import { act, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Instant } from "../Instant";
import { render } from "../../../../../../testing";
import mockInstantMeeting from "../../../../../../testing/mocks/mockInstantMeeting.json";

describe("Instant", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findAllByText, findByText } = render(
      <Instant meeting={mockInstantMeeting as never} onDelete={mockOnDelete}/>,
      { wrappers: { theme: true } },
    );

    expect(await findByText(/08 Apr, 2023 15:00/i)).toBeInTheDocument();
    expect((await findAllByText("Instant")).length).toBe(1);
  });

  test("should delete meeting", async () => {
    const mockOnDelete = jest.fn();
    mockOnDelete.mockResolvedValue(true);

    const { findByRole } = render(
      <Instant meeting={mockInstantMeeting as never} onDelete={mockOnDelete}/>,
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
