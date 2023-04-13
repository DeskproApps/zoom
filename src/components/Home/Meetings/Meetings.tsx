import { match, P } from "ts-pattern";
import get from "lodash.get";
import size from "lodash.size";
import isNil from "lodash.isNil";
import { P5, Title } from "@deskpro/app-sdk";
import { Container } from "../../common";
import { Instant, Recurring, Scheduled } from "./views";
import type { FC } from "react";
import type { Props, MeetingProps } from "../types";
import type { MeetingTypes } from "../../../services/zoom/types";

enum MeetingTypeMap {
  INSTANT = 1,
  SCHEDULED = 2,
  RECURRING_NO_FIXED_TIME = 3,
  RECURRING_WITH_FIXED_TIME = 8,
}

const map = (type: MeetingTypes) => {
  return match(type)
    .with(MeetingTypeMap.INSTANT, () => Instant)
    .with(MeetingTypeMap.SCHEDULED, () => Scheduled)
    .with(
      P.union(
        MeetingTypeMap.RECURRING_NO_FIXED_TIME,
        MeetingTypeMap.RECURRING_WITH_FIXED_TIME
      ),
      () => Recurring
    )
    .otherwise(() => null);
};

const MeetingView: FC<MeetingProps> = ({ meeting, onDelete }) => {
  const Meeting = map(get(meeting, ["type"]));

  return isNil(Meeting) ? null : (
    <Meeting meeting={meeting} onDelete={onDelete} />
  );
};

const Meetings: FC<Pick<Props, "meetings" | "onDeleteMeeting">> = ({
  meetings,
  onDeleteMeeting,
}) => {
  return (
    <Container>
      <Title title={`Active meetings (${size(meetings)})`} />
      {!size(meetings) ? (
        <P5>No meetings found</P5>
      ) : (
        (Array.isArray(meetings) ? meetings : []).map((meeting) => (
          <MeetingView
            key={meeting.id}
            meeting={meeting}
            onDelete={onDeleteMeeting}
          />
        ))
      )}
    </Container>
  );
};

export { Meetings };
