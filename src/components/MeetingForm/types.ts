import { z } from "zod";
import { instantValidationSchema, scheduleValidationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { DateTime } from "../../types";
import type { MeetingTypes, MeetingDetails, Recurrence } from "../../services/zoom/types";

export enum meeting {
  INSTANT = 1,
  SCHEDULE = 2,
  RECURRING = 8,
}

export enum recurrence {
  DAILY = 1,
  WEEKLY = 2,
  MONTHLY = 3,
}

export type InstantFormValidationSchema = z.infer<typeof instantValidationSchema>;

export type InstantMeetingValues = {
  type: MeetingTypes,
  topic: string,
  timezone: string,
  start_time: DateTime,
};

export type InstantFormProps = {
  error?: string|string[]|null,
  onSubmit: SubmitHandler<InstantFormValidationSchema>,
  onCancel: () => void,
};

export type ScheduleFormValidationSchema = z.infer<typeof scheduleValidationSchema>;

export type ScheduleMeetingValues = {
  type: MeetingTypes,
  topic: MeetingDetails["topic"],
  timezone: MeetingDetails["timezone"],
  start_time: DateTime,
  recurrence?: Recurrence,
};

export type ScheduleFormProps = {
  error?: string|string[]|null,
  onSubmit: SubmitHandler<ScheduleFormValidationSchema>,
  onCancel: () => void,
};
