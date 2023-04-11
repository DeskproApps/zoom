import { useNavigate } from "react-router-dom";
import { act, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../testing";
import { CreateInstantMeetingPage } from "../CreateInstantMeetingPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("InstantMeetingForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test.todo("should submit form");

  test("should move back to home page on cancel", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { findByRole } = render(
      <CreateInstantMeetingPage />,
      { wrappers: { theme: true, router: true, query: true } },
    );

    const cancelButton = await findByRole("button", { name: "Cancel" });

    await act(async () => {
      await userEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });
});
