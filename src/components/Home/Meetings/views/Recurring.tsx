import { useState, useCallback } from "react";
import { Stack } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { getHumanReadableRecurrence } from "@/utils";
import { format } from "@/utils/date";
import { DATETIME_FORMAT } from "@/constants";
import { Button, TwoProperties, ZoomLogo } from "@/components/common";
import type { FC } from "react";
import type { MeetingProps } from "@/components/Home/types";

const Recurring: FC<MeetingProps> = ({ meeting, onDelete, onInsertLink }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDeleteMeeting = useCallback(() => {
    setIsLoading(true);

    onDelete(meeting).finally(() => setIsLoading(false));
  }, [onDelete, meeting]);

  return (
    <div style={{ marginBottom: 14 }}>
      <Title
        title={meeting.topic || meeting.id}
        link={meeting.join_url}
        icon={<ZoomLogo />}
        marginBottom={7}
      />
      <TwoProperties
        leftLabel="Created"
        leftText={format(meeting.created_at, DATETIME_FORMAT)}
        rightLabel="Type"
        rightText="Recurring"
      />
      <TwoProperties
        leftLabel="Recurrence"
        leftText={getHumanReadableRecurrence(meeting?.recurrence)}
        rightLabel="Start time"
        rightText={format(meeting.start_time, DATETIME_FORMAT)}
      />
      <Stack justify="space-between">
        <Button
          type="button"
          text="Insert Link"
          intent="secondary"
          onClick={() => onInsertLink(meeting)}
        />

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

export { Recurring };
