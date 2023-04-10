import { cleanup } from "@testing-library/react";
import { InstantMeetingForm } from "../InstantMeetingForm";
import { render } from "../../../../testing";

describe("InstantMeetingForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(
      <InstantMeetingForm
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />,
      { wrappers: { theme: true } },
    );

    expect(await findByText(/Topic/i)).toBeInTheDocument();
    expect(await findByText(/Date\/time/i)).toBeInTheDocument();
    expect(await findByText(/Time zone/i)).toBeInTheDocument();
  });
});
