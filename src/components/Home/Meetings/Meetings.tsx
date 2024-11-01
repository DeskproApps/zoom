import { match } from "ts-pattern";
import { P5 } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { Container } from "@/components/common";
import { Instant, Recurring, Scheduled } from "./views";
import { MeetingTypeMap } from "@/services/zoom/types";
import type { FC } from "react";
import type { Props, MeetingProps } from "@/components/Home/types";
import type { MeetingTypes } from "@/services/zoom/types";

const map = (type: MeetingTypes) => {
  return match(type)
    .with(MeetingTypeMap.INSTANT, () => Instant)
    .with(MeetingTypeMap.SCHEDULE, () => Scheduled)
    .with(MeetingTypeMap.RECURRING, () => Recurring)
    .otherwise(() => null);
};

const MeetingView: FC<MeetingProps> = ({ meeting, onDelete, onInsertLink }) => {
  const Meeting = map(meeting.type);

  return Meeting === null ? null : (
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
      <Title title={`Active meetings (${meetings.length})`} />
      {meetings.length === 0 ? (
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
