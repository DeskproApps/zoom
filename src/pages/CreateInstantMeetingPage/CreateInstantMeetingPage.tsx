import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { createMeetingService } from "../../services/zoom";
import { getInstantValues } from "../../components/MeetingForm";
import { InstantMeetingForm } from "../../components";
import type { FC } from "react";
import type { InstantFormProps } from "../../components/MeetingForm";

export const CreateInstantMeetingPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<string|string[]|null>(null);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit: InstantFormProps["onSubmit"] = useCallback((values) => {
    if (!client) {
      return;
    }

    setError(null);

    return createMeetingService(client, getInstantValues(values))
      .then((meeting) => client.setUserState(`zoom/meetings/${meeting.id}`, meeting))
      .then(({ isSuccess, errors }) => {
        if (isSuccess) {
          queryClient.invalidateQueries().finally(() => navigate("/home"));
        } else {
          setError(errors);
        }
      })
      .catch((err) => {
        // ToDo: handle error
        // eslint-disable-next-line no-console
        console.error("zoom create:", err);
      });
  }, [client, navigate, queryClient]);

  useSetTitle("Create meeting");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", { type: "home_button", payload: { type: "changePage", path: "/home" } });
  });

  return (
    <InstantMeetingForm onSubmit={onSubmit} onCancel={onCancel} error={error} />
  );
};