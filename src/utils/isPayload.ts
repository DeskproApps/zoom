import { has } from "lodash";
import type { EventPayload, NavigateToChangePage } from "../types";

const isNavigatePayload = (
  payload: EventPayload
): payload is NavigateToChangePage => {
  return has(payload, ["path"]);
};

export { isNavigatePayload };
