import { act, cleanup, waitFor, renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteAccessTokenService } from "../../services/deskpro";
import { useLogout } from "../useLogout";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../services/deskpro/deleteAccessTokenService", () => ({
  deleteAccessTokenService: jest.fn(),
}));

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should navigate to login page if success logout", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (deleteAccessTokenService as jest.Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      result.current.logout();
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/login");
    });
  });

  test("should navigate to login page if error logout", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (deleteAccessTokenService as jest.Mock).mockRejectedValueOnce(new Error());

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      result.current.logout();
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/login");
    });
  });
});
