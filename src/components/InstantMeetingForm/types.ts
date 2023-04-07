import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { DateTime } from "../../types";
import type { MeetingTypes } from "../../services/zoom/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type MeetingValues = {
  type: MeetingTypes,
  topic: string,
  timezone: string,
  datetime: DateTime,
};

export type Props = {
  error: string|string[]|null,
  onSubmit: SubmitHandler<FormValidationSchema>,
  onCancel: () => void,
};
