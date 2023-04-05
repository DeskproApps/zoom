import get from "lodash/get";
import { Title, useQueryWithClient } from "@deskpro/app-sdk";
import { getMeetingService } from "../../../../services/zoom";
import { QueryKey } from "../../../../query";
import { getHumanReadableRecurrence } from "../../../../utils";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import { TwoProperties, ZoomLogo } from "../../../common";
import type { FC } from "react";
import type { MeetingProps } from "../../types";

const Recurring: FC<MeetingProps> = ({ meeting }) => {
  const data = useQueryWithClient(
    [QueryKey.MEETINGS, `${meeting.id}`],
    (client) => getMeetingService(client, meeting.id),
  );

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
        leftText={getHumanReadableRecurrence(get(data, ["data", "recurrence"]))}
        rightLabel="Start time"
        rightText={format(meeting.start_time, DATETIME_FORMAT)}
      />
    </div>
  );
};

export { Recurring };
