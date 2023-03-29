import type { To } from "react-router-dom";
/**
 * An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"`.
 */
export type DateTime = string;

export type Settings = {
  client_id?: string,
};

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
  | { type: "logout" }
;
