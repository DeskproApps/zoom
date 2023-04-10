import { HorizontalDivider } from "@deskpro/app-sdk";
import { Meetings } from "./Meetings";
import { CreateMeeting } from "./CreateMeeting";
import type { FC } from "react";
import type { Props } from "./types";

const Home: FC<Props> = ({ meetings, onCreateInstant, onCreateSchedule, onDeleteMeeting }) => {
  return (
    <>
      <CreateMeeting
        onCreateInstant={onCreateInstant}
        onCreateSchedule={onCreateSchedule}
      />
      <HorizontalDivider />
      <Meetings meetings={meetings} onDeleteMeeting={onDeleteMeeting} />
      <HorizontalDivider />
    </>
  );
};

export { Home };
