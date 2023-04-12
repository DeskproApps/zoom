import { Title } from "@deskpro/app-sdk";
import { TwoProperties, ZoomLogo } from "../../../common";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import type { FC } from "react";
import type { MeetingProps } from "../../types";

const Instant: FC<MeetingProps> = ({ meeting }) => {
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
        rightText="Instant"
      />
    </div>
  );
};

export { Instant };
