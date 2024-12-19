import type { EventPayload, NavigateToChangePage } from "@/types";

const isNavigatePayload = (
  payload: EventPayload
): payload is NavigateToChangePage => {
  return Object.hasOwn(payload ?? {}, 'path');
};

export { isNavigatePayload };
