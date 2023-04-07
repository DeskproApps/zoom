import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { createMeetingService } from "../../services/zoom";
import { queryClient, QueryKey } from "../../query";
import { getValues } from "../../components/InstantMeetingForm";
import { InstantMeetingForm } from "../../components";
import type { FC } from "react";
import type { Props as FormProps } from "../../components/InstantMeetingForm/types";

export const CreateInstantMeetingPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<string|string[]|null>(null);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onSubmit: FormProps["onSubmit"] = useCallback((values) => {
    if (!client) {
      return;
    }

    setError(null);

    return createMeetingService(client, getValues(values))
      .then((meeting) => {
        return client.setUserState(`zoom/meetings/${meeting.id}`, meeting);
      })
      .then(({ isSuccess, errors }) => {
        if (isSuccess) {
          queryClient.invalidateQueries([QueryKey.MEETINGS, QueryKey.INSTANT_MEETINGS])
            .finally(() => navigate("/home"));
        } else {
          setError(errors);
        }
      })
      .catch((err) => {
        // ToDo: handle error
        // eslint-disable-next-line no-console
        console.error("zoom create:", err);
      });
  }, [client, navigate]);

  useSetTitle(" Create meeting");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", { type: "home_button", payload: { type: "changePage", path: "/home" } });
  });

  return (
    <InstantMeetingForm onSubmit={onSubmit} onCancel={onCancel} error={error} />
  );
};
