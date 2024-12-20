import { act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScheduleMeetingForm} from "../ScheduleMeetingForm";
import { render } from "@/testing";

describe("ScheduleMeetingForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test.skip("render", async () => {
    const { findByText } = render(
      <ScheduleMeetingForm onSubmit={jest.fn()} onCancel={jest.fn()} />,
      { wrappers: { theme: true } },
    );

    expect(await findByText(/Topic/i)).toBeInTheDocument();
    expect(await findByText(/Date\/time/i)).toBeInTheDocument();
    expect(await findByText(/Time zone/i)).toBeInTheDocument();
    expect(await findByText(/Recurring/i)).toBeInTheDocument();
  });

  test.skip("Should show daily recurring fields", async () => {
    const { findByText } = render(
      <ScheduleMeetingForm onSubmit={jest.fn()} onCancel={jest.fn()} />,
      { wrappers: { theme: true } },
    );

    const recurringCheckbox = await findByText(/Recurring/i);

    await act(async () => {
      await userEvent.click(recurringCheckbox);
    });

    expect(await findByText(/Recurrence/i)).toBeInTheDocument();
    expect(await findByText(/Repeat every/i)).toBeInTheDocument();
    expect(await findByText(/End date/i)).toBeInTheDocument();
  });
});
