import { match } from "ts-pattern";
import { DAYS } from "@/constants";
import type { Recurrence } from "@/services/zoom/types";

const TYPE = {
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
} as const;

const getDay = (day: string): string => {
  return match(Number(day))
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
  if (Object.values(recurrence).filter((value) => value !== undefined).length === 0) {
    return "-";
  }

  const { type, repeat_interval = 0, weekly_days } = recurrence;

  let message = "Every ";
  const isPlural = repeat_interval > 1;

  message += match<typeof TYPE[keyof typeof TYPE]|undefined>(type)
    .with(TYPE.DAILY, () => `${!isPlural ? "day" : `${repeat_interval} days`}`)
    .with(TYPE.WEEKLY, () => `${!isPlural ? "week" : `${repeat_interval} weeks`}`)
    .with(TYPE.MONTHLY, () => `${!isPlural ? "month" : `${repeat_interval} months`}`)
    .run();

  if (type === TYPE.WEEKLY && weekly_days !== undefined) {
    const days = weekly_days?.split(",").map(getDay).filter(Boolean).join(", ");

    if (days !== undefined) {
      message += ` on ${days}`;
    }
  }

  return message;
};

export { getHumanReadableRecurrence };
