import { HorizontalDivider } from "@deskpro/app-sdk";
import { Meetings } from "./Meetings";
import { CreateMeeting } from "./CreateMeeting";
import { ErrorBlock } from "../Error";
import type { FC } from "react";
import type { Props } from "./types";

const Home: FC<Props> = ({
  error,
  meetings,
  onInsertLink,
  onCreateInstant,
  onDeleteMeeting,
  onCreateSchedule,
}) => {
  return (
    <>
      {error && <ErrorBlock text={error} />}
      <CreateMeeting
        onCreateInstant={onCreateInstant}
        onCreateSchedule={onCreateSchedule}
      />
      <HorizontalDivider />
      <Meetings
        meetings={meetings}
        onInsertLink={onInsertLink}
        onDeleteMeeting={onDeleteMeeting}
      />
      <HorizontalDivider />
    </>
  );
};

export { Home };
