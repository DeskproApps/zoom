import { Stack, Title } from "@deskpro/app-sdk";
import { Button, Container } from "../common";
import type { FC } from "react";
import type { Props } from "./types";

const CreateMeeting: FC<Pick<Props, "onCreateInstant"|"onCreateSchedule">> = ({
  onCreateInstant,
  onCreateSchedule,
}) => {
  return (
    <Container style={{ marginBottom: 14 }}>
      <Title title="Create a meeting" />

      <Stack vertical gap={20}>
        <Button
          type="button"
          intent="secondary"
          text="Create instant meeting"
          onClick={onCreateInstant}
        />
        <Button
          type="button"
          intent="secondary"
          text="Create scheduled meeting"
          onClick={onCreateSchedule}
        />
      </Stack>
    </Container>
  );
}

export { CreateMeeting };
