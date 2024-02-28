import { get, range, size } from "lodash";
import isDate from "date-fns/isDate";
import format from "date-fns/format";
import { match } from "ts-pattern";
import { z } from "zod";
import { getOption } from "../../utils";
import { MeetingTypeMap } from "../../services/zoom/types";
import { recurrence } from "./types";
import type { Recurrence } from "../../services/zoom/types";
import type { Option } from "../../types";
import type { RecurrenceTypes } from "../../services/zoom/types";
import type {
  ScheduleMeetingValues,
  ScheduleFormValidationSchema,
} from "./types";

const repeatIntervalValidator = <T>(values: T): boolean => {
  const repeatInterval = get(values, ["repeatInterval"]);

  return match(get(values, ["recurringType"]))
    .with(recurrence.DAILY, () => repeatInterval >= 1 && repeatInterval <= 15)
    .with(recurrence.WEEKLY, () => repeatInterval >= 1 && repeatInterval <= 12)
    .with(recurrence.MONTHLY, () => repeatInterval >= 1 && repeatInterval <= 3)
    .otherwise(() => true);
};

const endDatetimeValidator = <T>(values: T): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const endDatetime = get(values, ["endDatetime"]);

  return !isRecurring ? true : z.date().safeParse(endDatetime).success;
};

const occursWeeklyValidator = <T>(values: T): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const isWeekly = get(values, ["recurringType"]) === 2;
  const weekly = get(values, ["occursWeekly"], []);

  if (!isRecurring || !isWeekly) {
    return true;
  }

  return size(weekly) > 0;
};

const occursMonthlyValidator = <T>(values: T): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const isMonthly = get(values, ["recurringType"]) === 3;

  if (!isRecurring || !isMonthly) {
    return true;
  }

  return get(values, ["occursMonthly"]) > 0;
};

const scheduleValidationSchema = z
  .object({
    topic: z.string().nonempty(),
    timezone: z.string().nonempty(),
    datetime: z.date(),
    recurring: z.boolean(),
    recurringType: z.number().min(1).max(3).optional(),
    repeatInterval: z.number().optional(),
    endDatetime: z.date().optional(),
    occursWeekly: z.number().array().optional(),
    occursMonthly: z.number().optional(),
  })
  .refine(repeatIntervalValidator, {
    message: "Wrong interval",
    path: ["repeatInterval"],
  })
  .refine(endDatetimeValidator, {
    message: "End Datetime require",
    path: ["endDatetime"],
  })
  .refine(occursWeeklyValidator, {
    message: "Occurs require",
    path: ["occursWeekly"],
  })
  .refine(occursMonthlyValidator, {
    message: "Occurs require",
    path: ["occursMonthly"],
  });

const getInitScheduleValues = () => ({
  topic: "",
  timezone: "",
  recurring: false,
  recurringType: 1,
  repeatInterval: 1,
  occursWeekly: [],
  occursMonthly: 0,
});

const getScheduleValues = (
  values: ScheduleFormValidationSchema
): ScheduleMeetingValues => {
  return {
    type: !values.recurring ? MeetingTypeMap.SCHEDULE : MeetingTypeMap.RECURRING,
    topic: values.topic,
    timezone: values.timezone,
    /** Setting the date as it is to account for time zone dependence `yyyy-MM-ddTHH:mm:ssZ` */
    start_time: `${format(values.datetime, "yyyy-MM-dd")}T${format(values.datetime, "HH:mm:ss")}.000Z`,
    ...(!values.recurring
      ? {}
      : {
          recurrence: {
            type: get(
              values,
              ["recurringType"],
              recurrence.DAILY
            ) as Recurrence["type"],
            repeat_interval: get(values, ["repeatInterval"], 1),
            ...(isDate(get(values, ["endDatetime"]))
              ? { end_date_time: (values.endDatetime as Date).toISOString() }
              : {}),
            ...(values.recurringType === recurrence.WEEKLY
              ? { weekly_days: values.occursWeekly?.join(",") }
              : {}),
            ...(values.recurringType === recurrence.MONTHLY
              ? { monthly_day: values.occursMonthly }
              : {}),
          },
        }),
  };
};

const getRepeatIntervalOptions = (
  recurringType?: RecurrenceTypes
): Array<Option<number>> => {
  return match(recurringType)
    .with(recurrence.DAILY, () =>
      range(1, 16).map((value) => getOption<number>(value, `${value} day(s)`))
    )
    .with(recurrence.WEEKLY, () =>
      range(1, 13).map((value) => getOption<number>(value, `${value} week(s)`))
    )
    .with(recurrence.MONTHLY, () =>
      range(1, 4).map((value) => getOption<number>(value, `${value} month(s)`))
    )
    .otherwise(() => []);
};

const getOccursMonthlyOptions = () => {
  return range(1, 32).map((value) => getOption<number>(value, `${value}`));
};

export {
  getScheduleValues,
  endDatetimeValidator,
  getInitScheduleValues,
  occursWeeklyValidator,
  occursMonthlyValidator,
  repeatIntervalValidator,
  getOccursMonthlyOptions,
  scheduleValidationSchema,
  getRepeatIntervalOptions,
};
