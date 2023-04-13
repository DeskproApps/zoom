import { useState, useCallback } from "react";
import { Stack, Title } from "@deskpro/app-sdk";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import {
  Button,
  ZoomLogo,
  Property,
  TwoProperties,
} from "../../../common";
import type { FC } from "react";
import type { MeetingProps } from "../../types";

const Scheduled: FC<MeetingProps> = ({ meeting, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteMeeting = useCallback(() => {
    setIsLoading(true);

    onDelete(meeting)
      .finally(() => setIsLoading(false));

  }, [onDelete, meeting]);

  return (
    <div style={{ marginBottom: 14 }}>
      <Title
        title={meeting.topic || meeting.id}
        marginBottom={7}
        icon={<ZoomLogo/>}
        link={meeting.join_url}
      />
      <TwoProperties
        leftLabel="Created"
        leftText={format(meeting.created_at, DATETIME_FORMAT)}
        rightLabel="Type"
        rightText="Scheduled"
      />
      <Property
        label="Start time"
        text={format(meeting.start_time, DATETIME_FORMAT)}
      />
      <Stack justify="space-between">
        <Button
          type="button"
          text="Delete"
          intent="secondary"
          loading={isLoading}
          disabled={isLoading}
          onClick={onDeleteMeeting}
        />
      </Stack>
    </div>
  );
};

export { Scheduled };
