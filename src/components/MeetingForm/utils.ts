import isDate from "date-fns/isDate";
import format from "date-fns/format";
import { match } from "ts-pattern";
import { z } from "zod";
import { getOption } from "@/utils";
import { MeetingTypeMap } from "@/services/zoom/types";
import { recurrence } from "./types";
import type { Option } from "@/types";
import type { Recurrence, RecurrenceTypes } from "@/services/zoom/types";
import type {
  ScheduleMeetingValues,
  ScheduleFormValidationSchema,
} from "./types";

const repeatIntervalValidator = <T>(values: T): boolean => {
  const repeatInterval = values.repeatInterval;

  return match(values?.recurringType)
    .with(recurrence.DAILY, () => repeatInterval >= 1 && repeatInterval <= 15)
    .with(recurrence.WEEKLY, () => repeatInterval >= 1 && repeatInterval <= 12)
    .with(recurrence.MONTHLY, () => repeatInterval >= 1 && repeatInterval <= 3)
    .otherwise(() => true);
};

const endDatetimeValidator = <T>(values: T): boolean => {
  const isRecurring = values?.recurring;
  const endDatetime = values?.endDatetime;

  return !isRecurring ? true : z.date().safeParse(endDatetime).success;
};

const occursWeeklyValidator = <T>(values: T): boolean => {
  const isRecurring = values.recurring;
  const isWeekly = values.recurringType === 2;
  const weekly = values.occursWeekly ?? [];

  if (!isRecurring || !isWeekly) {
    return true;
  }

  return weekly.length > 0;
};

const occursMonthlyValidator = <T>(values: T): boolean => {
  const isRecurring = values?.recurring;
  const isMonthly = values?.recurringType === 3;

  if (!isRecurring || !isMonthly) {
    return true;
  }

  return values?.occursMonthly > 0;
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
            type: values?.recurringType ?? recurrence.DAILY as Recurrence["type"],
            repeat_interval: values?.repeatInterval ?? 1,
            ...(isDate(values?.endDatetime)
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
      [...Array(15).keys()].map((value) => getOption<number>(value, `${value + 1} day(s)`))
    )
    .with(recurrence.WEEKLY, () =>
      [...Array(12).keys()].map((value) => getOption<number>(value, `${value + 1} week(s)`))
    )
    .with(recurrence.MONTHLY, () =>
      [...Array(3).keys()].map((value) => getOption<number>(value, `${value + 1} month(s)`))
    )
    .otherwise(() => []);
};

const getOccursMonthlyOptions = () => {
  return [...Array(31).keys()].map((value) => getOption<number>(value + 1, `${value + 1}`));
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
