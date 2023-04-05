import { Title } from "@deskpro/app-sdk";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import { Property, TwoProperties, ZoomLogo } from "../../../common";
import type { FC } from "react";
import type { Meeting } from "../../../../services/zoom/types";

const Scheduled: FC<Meeting> = (props) => {
  return (
    <div style={{ marginBottom: 14 }}>
      <Title title={props.topic || props.id} marginBottom={7} icon={<ZoomLogo/>} link={props.join_url} />
      <TwoProperties
        leftLabel="Created"
        leftText={format(props.created_at, DATETIME_FORMAT)}
        rightLabel="Type"
        rightText="Scheduled"
      />
      <Property
        label="Start time"
        text={format(props.start_time, DATETIME_FORMAT)}
      />
    </div>
  );
};

export { Scheduled };
