import get from "lodash/get";
import { Title, useQueryWithClient } from "@deskpro/app-sdk";
import { getMeetingService } from "../../../../services/zoom";
import { QueryKey } from "../../../../query";
import { getHumanReadableRecurrence } from "../../../../utils";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import { TwoProperties, ZoomLogo } from "../../../common";
import type { FC } from "react";
import type { Meeting } from "../../../../services/zoom/types";

const Recurring: FC<Meeting> = (props) => {
  const data = useQueryWithClient(
    [QueryKey.MEETINGS, `${props.id}`],
    (client) => getMeetingService(client, props.id),
  );

  return (
    <div style={{ marginBottom: 14 }}>
      <Title title={props.topic || props.id} marginBottom={7} icon={<ZoomLogo/>} link={props.join_url} />
      <TwoProperties
        leftLabel="Created"
        leftText={format(props.created_at, DATETIME_FORMAT)}
        rightLabel="Type"
        rightText="Recurring"
      />
      <TwoProperties
        leftLabel="Recurrence"
        leftText={getHumanReadableRecurrence(get(data, ["data", "recurrence"]))}
        rightLabel="Start time"
        rightText={format(props.start_time, DATETIME_FORMAT)}
      />
    </div>
  );
};

export { Recurring };
