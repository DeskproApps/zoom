import { getOption } from "./getOption";
import timezones from "./timezones.json";
import type { Option } from "@/types";

/**
 * @see https://developers.zoom.us/docs/api/rest/other-references/abbreviation-lists/#timezones
 */
const getTimeZoneOptions = (): Array<Option<string>> => {
  return timezones.map((zone) => getOption(zone, zone));
};

export { getTimeZoneOptions };
