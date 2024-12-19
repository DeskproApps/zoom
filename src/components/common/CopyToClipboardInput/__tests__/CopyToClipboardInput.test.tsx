import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyToClipboardInput } from "@/components/common/CopyToClipboardInput";
import { render } from "@/testing/index";

describe("CopyToClipboardInput", () => {
  document.execCommand = jest.fn().mockReturnValue(true);

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", () => {
    const { getByRole } = render(<CopyToClipboardInput value="https://call-back.url" />, { wrappers: { theme: true }});
    const input = getByRole("textbox") as HTMLInputElement;
    expect(input.value).toStrictEqual("https://call-back.url");
  });

  test("should disabled input", () => {
    const { getByRole } = render(<CopyToClipboardInput value="https://call-back.url" />, { wrappers: { theme: true }});
    const input = getByRole("textbox");
    expect(input).toHaveAttribute('disabled');
  });

  test("should the value copied to clipboard", async () => {
    const { getByRole } = render(<CopyToClipboardInput value="https://call-back.url" />, { wrappers: { theme: true }});
    const copyButton = getByRole("button");

    await act(async () => {
      await userEvent.click(copyButton);
    });

    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
