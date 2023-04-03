import { useNavigate } from "react-router-dom";
import { act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../LoginPage";
import { render } from "../../../../testing";
import { useLogin } from "../hooks";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../hooks", () => ({ useLogin: jest.fn() }));

describe("LoginPage", () => {
  test("render", async () => {
    (useLogin as jest.Mock).mockImplementation(() => ({
      error: null,
      isAuth: false,
      authLink: "https://call-back.url/?code=123",
      onSignIn: jest.fn(),
      isLoading: false,
    }));
    const { findByRole } = render(<LoginPage/>, { wrappers: { theme: true }});
    const loginButton = await findByRole("link", { name: /Log In/i });

    await waitFor(() => {
      expect(loginButton).toBeInTheDocument();
    });
  });

  test("should run auth flow", async () => {
    const onSignIn = jest.fn();
    (useLogin as jest.Mock).mockImplementation(() => ({
      error: null,
      isAuth: false,
      isLoading: false,
      authLink: "https://call-back.url/?code=123",
      onSignIn,
    }));
    const { findByRole } = render(<LoginPage/>, { wrappers: { theme: true }});

    const loginButton = await findByRole("link", { name: /Log In/i });

    await act(async () => {
      await userEvent.click(loginButton);
    });

    expect(onSignIn).toHaveBeenCalledTimes(1);
  });

  test("should navigate to /home after auth", async () => {
    const navigate = jest.fn();
    (useLogin as jest.Mock).mockImplementation(() => ({
      error: null,
      isAuth: true,
      isLoading: false,
      authLink: "https://call-back.url/?code=123",
      onSignIn: jest.fn(),
    }));
    (useNavigate as jest.Mock).mockImplementation(() => navigate);
    render(<LoginPage/>, { wrappers: { theme: true }});

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/home");
  });
});
