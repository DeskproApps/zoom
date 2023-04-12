import { useState, useCallback } from "react";
import get from "lodash/get";
import { Stack, Title, useQueryWithClient } from "@deskpro/app-sdk";
import { getMeetingService } from "../../../../services/zoom";
import { QueryKey } from "../../../../query";
import { getHumanReadableRecurrence } from "../../../../utils";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import { Button, TwoProperties, ZoomLogo } from "../../../common";
import type { FC } from "react";
import type { MeetingProps } from "../../types";

const Recurring: FC<MeetingProps> = ({ meeting, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const meetingDetails = useQueryWithClient(
    [QueryKey.MEETINGS, `${meeting.id}`],
    (client) => getMeetingService(client, meeting.id),
  );

  const onDeleteMeeting = useCallback(() => {
    setIsLoading(true);

    onDelete(meeting)
      .finally(() => setIsLoading(false));
  }, [onDelete, meeting]);

  return (
    <div style={{ marginBottom: 14 }}>
      <Title
        title={meeting.topic || meeting.id}
        link={meeting.join_url}
        icon={<ZoomLogo/>}
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
        leftText={getHumanReadableRecurrence(get(meetingDetails, ["data", "recurrence"]))}
        rightLabel="Start time"
        rightText={format(
          get(meetingDetails, ["data", "occurrences", 0, "start_time"]),
          DATETIME_FORMAT,
        )}
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

export { Recurring };
