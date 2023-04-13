import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { createMeetingService } from "../../services/zoom";
import { getScheduleValues } from "../../components/MeetingForm";
import { ScheduleMeetingForm } from "../../components";
import type { FC } from "react";
import type { ScheduleFormProps } from "../../components/MeetingForm";

const CreateScheduleMeetingPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<string|string[]|null>(null);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit: ScheduleFormProps["onSubmit"] = useCallback((values) => {
    if (!client) {
      return;
    }

    setError(null);

    return createMeetingService(client, getScheduleValues(values))
      .then(() => queryClient.invalidateQueries())
      .then(() => navigate("/home"))
      .catch((err) => {
        // ToDo: handle error
        // eslint-disable-next-line no-console
        console.error("zoom create:", err);
      })
  }, [client, queryClient, navigate]);

  useSetTitle("Create meeting");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", { type: "home_button", payload: { type: "changePage", path: "/home" } });
  });

  return (<ScheduleMeetingForm onSubmit={onSubmit} onCancel={onCancel} error={error} />);
};

export { CreateScheduleMeetingPage };
