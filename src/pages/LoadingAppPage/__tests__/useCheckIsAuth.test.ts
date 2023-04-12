import { useNavigate } from "react-router-dom";
import { waitFor, renderHook } from "@testing-library/react";
import { useCheckIsAuth } from "../hooks";
import { getCurrentUserService } from "../../../services/zoom";
import { useLogout } from "../../../hooks";
import mockCurrentUser from "../../../../testing/mocks/mockCurrentUser.json";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../services/zoom/getCurrentUserService");
jest.mock("../../../hooks/useLogout");

describe("useCheckIsAuth", () => {
  test("should go to the main page if we have access token and receive user data", async () => {
    const logout = jest.fn();
    const navigate = jest.fn();
    (useLogout as jest.Mock).mockImplementation(() => ({ logout }));
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (getCurrentUserService as jest.Mock).mockResolvedValueOnce(mockCurrentUser);

    renderHook<void, unknown>(() => useCheckIsAuth());

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });

  test("should call logout", async () => {
    const logout = jest.fn();
    (useLogout as jest.Mock).mockImplementation(() => ({ logout }));
    (getCurrentUserService as jest.Mock).mockRejectedValueOnce(new Error());

    renderHook<void, unknown>(() => useCheckIsAuth());

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
});
