import { act, cleanup, waitFor, renderHook } from "@testing-library/react";
import { deleteInstantMeetingService } from "@/services/deskpro";
import { deleteMeetingService } from "@/services/zoom";
import { useDeleteMeeting } from "../useDeleteMeeting";
import mockInstantMeeting from "@/testing/mocks/mockInstantMeeting.json";
import mockScheduledMeeting from "@/testing/mocks/mockScheduledMeeting.json";

jest.mock("@/services/deskpro/deleteInstantMeetingService", () => ({
  deleteInstantMeetingService: jest.fn(),
}));

jest.mock("@/services/zoom/deleteMeetingService", () => ({
  deleteMeetingService: jest.fn(),
}));

describe("useDeleteMeeting", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should removed meeting from deskpro user store if it's an instant meeting", async () => {
    const mockDeleteInstantMeetingService = (deleteInstantMeetingService as jest.Mock).mockResolvedValueOnce(true);
    (deleteMeetingService as jest.Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useDeleteMeeting());

    await act(async () => {
      await result.current.deleteMeeting(mockInstantMeeting as never);
    });

    await waitFor(() => {
      expect(mockDeleteInstantMeetingService).toHaveBeenCalled();
    });
  });

  test("shouldn't send deleteInstantMeetingService if it isn't an instant meeting ", async () => {
    const mockDeleteInstantMeetingService = (deleteInstantMeetingService as jest.Mock).mockResolvedValueOnce(true);
    (deleteMeetingService as jest.Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useDeleteMeeting());

    await act(async () => {
      await result.current.deleteMeeting(mockScheduledMeeting as never);
    });

    await waitFor(() => {
      expect(mockDeleteInstantMeetingService).not.toHaveBeenCalled();
    });
  });

  test("should deleted meeting from zoom api", async () => {
    (deleteInstantMeetingService as jest.Mock).mockResolvedValueOnce(true);
    const mockDeleteMeetingService = (deleteMeetingService as jest.Mock).mockResolvedValueOnce(true);

    const { result } = renderHook(() => useDeleteMeeting());

    await act(async () => {
      await result.current.deleteMeeting(mockScheduledMeeting as never);
    });

    await waitFor(() => {
      expect(mockDeleteMeetingService).toHaveBeenCalled();
    });
  });
});
