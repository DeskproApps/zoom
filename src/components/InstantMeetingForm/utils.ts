import get from "lodash/get";
import { z } from "zod";
import type { FormValidationSchema, MeetingValues } from "./types";

const validationSchema = z.object({
  topic: z.string().nonempty(),
  timezone: z.string().nonempty(),
  datetime: z.date(),
});

const getInitValues = () => ({
  topic: "",
  timezone: "",
});

const getValues = (values: FormValidationSchema): MeetingValues => {
  return {
    type: get(values, ["type"], 1),
    topic: values.topic,
    timezone: values.timezone,
    datetime: values.datetime.toISOString(),
  };
};

export { validationSchema, getInitValues, getValues };
