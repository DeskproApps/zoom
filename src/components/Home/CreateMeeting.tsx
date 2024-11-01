import { useState, useCallback } from "react";
import { Stack } from "@deskpro/deskpro-ui";
import { Title } from "@deskpro/app-sdk";
import { Button, Container } from "@/components/common";
import type { FC } from "react";
import type { Props } from "./types";

const CreateMeeting: FC<Pick<Props, "onCreateInstant"|"onCreateSchedule">> = ({
  onCreateInstant,
  onCreateSchedule,
}) => {
  const [isLoadingInstant, setIsLoadingInstant] = useState<boolean>(false);

  const onCreateInstantMeeting = useCallback(() => {
    setIsLoadingInstant(true);
    onCreateInstant()
      .finally(() => setIsLoadingInstant(false));
  }, [onCreateInstant]);

  return (
    <Container style={{ marginBottom: 14 }}>
      <Title title="Create a meeting" />

      <Stack vertical gap={20}>
        <Button
          type="button"
          intent="secondary"
          text="Create instant meeting"
          onClick={onCreateInstantMeeting}
          loading={isLoadingInstant}
          disabled={isLoadingInstant}
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
