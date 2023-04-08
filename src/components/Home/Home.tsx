import { HorizontalDivider } from "@deskpro/app-sdk";
import { Meetings } from "./Meetings";
import { CreateMeeting } from "./CreateMeeting";
import type { FC } from "react";
import type { Props } from "./types";

const Home: FC<Props> = ({ meetings, onCreateInstant, onDeleteMeeting }) => {
  return (
    <>
      <CreateMeeting onCreateInstant={onCreateInstant} />
      <HorizontalDivider />
      <Meetings meetings={meetings} onDeleteMeeting={onDeleteMeeting} />
      <HorizontalDivider />
    </>
  );
};

export { Home };
