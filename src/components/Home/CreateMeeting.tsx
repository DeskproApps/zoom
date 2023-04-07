import { Title } from "@deskpro/app-sdk";
import { Button, Container } from "../common";
import type { FC } from "react";
import type { Props } from "./types";

const CreateMeeting: FC<Pick<Props, "onCreateInstant">> = ({ onCreateInstant }) => {
  return (
    <Container style={{ marginBottom: 14 }}>
      <Title title="Create a meeting" />
      <Button
        type="button"
        intent="secondary"
        text="Create instant meeting"
        onClick={onCreateInstant}
      />
    </Container>
  );
}

export { CreateMeeting };
