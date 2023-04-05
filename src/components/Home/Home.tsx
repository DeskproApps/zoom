import { HorizontalDivider } from "@deskpro/app-sdk";
import { Meetings } from "./Meetings";
import type { FC } from "react";
import type { Props } from "./types";

const Home: FC<Props> = ({ meetings }) => {
  return (
    <>
      <Meetings meetings={meetings} />
      <HorizontalDivider />
    </>
  );
};

export { Home };
