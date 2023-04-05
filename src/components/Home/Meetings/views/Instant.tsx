import { Title } from "@deskpro/app-sdk";
import { TwoProperties, ZoomLogo } from "../../../common";
import { format } from "../../../../utils/date";
import { DATETIME_FORMAT } from "../../../../constants";
import type { FC } from "react";
import type { Meeting } from "../../../../services/zoom/types";

const Instant: FC<Meeting> = (m) => {
  return (
    <>
      <Title title={m.topic || m.id} icon={<ZoomLogo/>} link={m.join_url} />
      <TwoProperties
        leftLabel="Created"
        leftText={format(m.created_at, DATETIME_FORMAT)}
        rightLabel="Type"
        rightText="Instant"
      />
    </>
  );
};

export { Instant };
