import { cleanup } from "@testing-library/react";
import { ScheduleMeetingForm} from "../ScheduleMeetingForm";
import { render } from "../../../../testing";

describe("ScheduleMeetingForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render(
      <ScheduleMeetingForm
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />,
      { wrappers: { theme: true } },
    );

    expect(await findByText(/Topic/i)).toBeInTheDocument();
    expect(await findByText(/Date\/time/i)).toBeInTheDocument();
    expect(await findByText(/Time zone/i)).toBeInTheDocument();
  });

  test.todo("Should show errors");
});
