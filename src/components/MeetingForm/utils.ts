import get from "lodash/get";
import range from "lodash/range";
import size from "lodash/size";
import { match } from "ts-pattern";
import { z } from "zod";
import { getOption } from "../../utils";
import { recurrence, meeting } from "./types";
import type { Recurrence } from "../../services/zoom/types";
import type { Option } from "../../types";
import type {
  InstantMeetingValues,
  ScheduleMeetingValues,
  InstantFormValidationSchema,
  ScheduleFormValidationSchema,
} from "./types";

const instantValidationSchema = z.object({
  topic: z.string().nonempty(),
  timezone: z.string().nonempty(),
  datetime: z.date(),
});

const getInitInstantValues = () => ({
  topic: "",
  timezone: "",
});

const getInstantValues = (values: InstantFormValidationSchema): InstantMeetingValues => {
  return {
    type: get(values, ["type"], 1),
    topic: values.topic,
    timezone: values.timezone,
    start_time: values.datetime.toISOString(),
  };
};

///

const repeatIntervalValidator = (values): boolean => {
  const repeatInterval = get(values, ["repeatInterval"]);
  return match(get(values, ["recurringType"]))
    .with(1, () => repeatInterval >= 1 && repeatInterval <= 15)
    .with(2, () => repeatInterval >= 1 && repeatInterval <= 12)
    .with(3, () => repeatInterval >= 1 && repeatInterval <= 3)
    .otherwise(() => true);
};

const endDatetimeValidator = (values): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const endDatetime = get(values, ["endDatetime"]);

  return !isRecurring ? true : z.date().safeParse(endDatetime).success;
};

const occursWeeklyValidator = (values): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const isWeekly = get(values, ["recurringType"]) === 2;

  if (!isRecurring || !isWeekly) {
    return true;
  }

  return size(get(values, ["occursWeekly"], [])) > 0;
};

const occursMonthlyValidator = (values): boolean => {
  const isRecurring = get(values, ["recurring"]);
  const isMonthly = get(values, ["recurringType"]) === 3;

  if (!isRecurring || !isMonthly) {
    return true;
  }

  return get(values, ["occursMonthly"]) > 0;
};

const scheduleValidationSchema = instantValidationSchema
  .extend({
    topic: z.string().nonempty(),
    timezone: z.string().nonempty(),
    datetime: z.date(),
    recurring: z.boolean(),
    recurringType: z.number().min(1).max(3).optional(),
    repeatInterval: z.number().optional(),
    endDatetime: z.date().optional(),
    occursWeekly: z.string().array().optional(),
    occursMonthly: z.number().optional(),
  })
  .refine(repeatIntervalValidator, { message: "Wrong interval", path: ["repeatInterval"] })
  .refine(endDatetimeValidator, { message: "End Datetime require", path: ["endDatetime"] })
  .refine(occursWeeklyValidator, { message: "Occurs require", path: ["occursWeekly"] })
  .refine(occursMonthlyValidator, { message: "Occurs require", path: ["occursMonthly"] })
;

const getInitScheduleValues = () => ({
  topic: "",
  timezone: "",
  recurring: false,
  recurringType: 1,
  repeatInterval: 1,
  occursWeekly: [],
  occursMonthly: 0,
});

const getScheduleValues = (values: ScheduleFormValidationSchema): ScheduleMeetingValues => {
  return {
    type: !values.recurring ? meeting.SCHEDULE : meeting.RECURRING,
    topic: values.topic,
    timezone: values.timezone,
    start_time: values.datetime.toISOString(),
    ...(!values.recurring ? {} : {
      recurrence: {
        type: values.recurringType,
        end_date_time: values.endDatetime.toISOString(),
        repeat_interval: values.repeatInterval,
        ...((values.recurringType ===recurrence.WEEKLY) ? { weekly_days: values.occursWeekly?.join(",") } : {}),
        ...((values.recurringType ===recurrence.MONTHLY) ? { monthly_day: values.occursMonthly } : {}),
      },
    }),
  };
};

const getRepeatIntervalOptions = (recurringType: Recurrence["type"]): Array<Option<number>> => {
  return match(recurringType)
    .with(1, () => range(1, 16).map((value) => getOption<number>(value, `${value} day(s)`)))
    .with(2, () => range(1, 13).map((value) => getOption<number>(value, `${value} week(s)`)))
    .with(3, () => range(1, 4).map((value) => getOption<number>(value, `${value} month(s)`)))
    .otherwise(() => []);
};

const getOccursMonthlyOptions = () => {
  return range(1, 32).map((value) => getOption<number>(value, `${value}`));
};

export {
  instantValidationSchema,
  getInitInstantValues,
  getInstantValues,
  scheduleValidationSchema,
  getInitScheduleValues,
  getScheduleValues,
  getRepeatIntervalOptions,
  getOccursMonthlyOptions,
};
