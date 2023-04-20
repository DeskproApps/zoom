import { match } from "ts-pattern";
import get from "lodash.get";
import size from "lodash.size";
import isNil from "lodash.isnil";
import { P5, Title } from "@deskpro/app-sdk";
import { Container } from "../../common";
import { Instant, Recurring, Scheduled } from "./views";
import { MeetingTypeMap } from "../../../services/zoom/types";
import type { FC } from "react";
import type { Props, MeetingProps } from "../types";
import type { MeetingTypes } from "../../../services/zoom/types";

const map = (type: MeetingTypes) => {
  return match(type)
    .with(MeetingTypeMap.INSTANT, () => Instant)
    .with(MeetingTypeMap.SCHEDULE, () => Scheduled)
    .with(MeetingTypeMap.RECURRING, () => Recurring)
    .otherwise(() => null);
};

const MeetingView: FC<MeetingProps> = ({ meeting, onDelete, onInsertLink }) => {
  const Meeting = map(get(meeting, ["type"]));

  return isNil(Meeting) ? null : (
    <Meeting meeting={meeting} onDelete={onDelete} onInsertLink={onInsertLink} />
  );
};

const Meetings: FC<Pick<Props, "meetings"|"onDeleteMeeting"|"onInsertLink">> = ({
  meetings,
  onInsertLink,
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
            onInsertLink={onInsertLink}
          />
        ))
      )}
    </Container>
  );
};

export { Meetings };
