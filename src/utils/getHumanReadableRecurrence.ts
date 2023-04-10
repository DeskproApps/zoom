import { match } from "ts-pattern";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import { DAYS } from "../constants";
import type { Recurrence } from "../services/zoom/types";

const TYPE = {
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
};

const getDay = (day: typeof DAYS[keyof typeof DAYS]) => {
  return match(day)
    .with(DAYS.Mon, () => "Mon")
    .with(DAYS.Tue, () => "Tue")
    .with(DAYS.Wed, () => "Wed")
    .with(DAYS.Thu, () => "Thu")
    .with(DAYS.Fri, () => "Fri")
    .with(DAYS.Sat, () => "Sat")
    .with(DAYS.Sun, () => "Sun")
    .otherwise(() => "");
};

const getHumanReadableRecurrence = (recurrence: Recurrence): string => {
  if (isEmpty(recurrence)) {
    return "-";
  }

  const { type, repeat_interval, weekly_days } = recurrence;

  let message = "Every ";
  const isPlural = repeat_interval > 1;

  message += match<typeof TYPE[keyof typeof TYPE]>(type)
    .with(TYPE.DAILY, () => `${!isPlural ? "day" : `${repeat_interval} days`}`)
    .with(TYPE.WEEKLY, () => `${!isPlural ? "week" : `${repeat_interval} weeks`}`)
    .with(TYPE.MONTHLY, () => `${!isPlural ? "month" : `${repeat_interval} months`}`)
    .run();

  if (type === TYPE.WEEKLY && !isEmpty(weekly_days)) {
    const days = split(weekly_days, ",").map(getDay).filter(Boolean).join(", ");

    if (!isEmpty(days)) {
      message += ` on ${days}`;
    }
  }

  return message;
};

export { getHumanReadableRecurrence };
