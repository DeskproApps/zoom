import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, useDeskproElements } from "@deskpro/app-sdk";
import { useSetTitle, useDeleteMeeting, useAppendToReplyBox } from "../../hooks";
import { useMeetings, useCreateInstantMeeting } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, meetings } = useMeetings();
  const { createInstantMeeting, error } = useCreateInstantMeeting();
  const { deleteMeeting } = useDeleteMeeting();
  const { insertInviteIntoReplyBox } = useAppendToReplyBox();

  const onCreateSchedule = useCallback(() => navigate("/create-schedule-meeting"), [navigate]);

  useSetTitle("Zoom Meetings");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Log Out", payload: { type: "logout" } },
      ],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      error={error}
      meetings={meetings}
      onInsertLink={insertInviteIntoReplyBox}
      onCreateInstant={createInstantMeeting}
      onCreateSchedule={onCreateSchedule}
      onDeleteMeeting={deleteMeeting}
    />
  );
};

export { HomePage };
