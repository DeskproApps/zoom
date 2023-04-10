import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/app-sdk";
import { Input, Checkbox } from "@deskpro/deskpro-ui";
import { DAYS, DAY_NAMES } from "../../constants";
import { getTimeZoneOptions, getOption } from "../../utils";
import {
  getInitScheduleValues,
  scheduleValidationSchema,
  getRepeatIntervalOptions,
  getOccursMonthlyOptions,
} from "./utils";
import { ErrorBlock } from "../Error";
import {
  Label,
  Select,
  Button,
  DateInput,
  Container,
} from "../common";
import type { FC } from "react";
import type { ScheduleFormProps, ScheduleFormValidationSchema } from "./types";

const ScheduleMeetingForm: FC<ScheduleFormProps> = ({ onSubmit, onCancel, error }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleFormValidationSchema>({
    defaultValues: getInitScheduleValues(),
    resolver: zodResolver(scheduleValidationSchema),
  });

  const [
    topic,
    timezone,
    recurring,
    recurringType,
    repeatInterval,
    occursWeekly,
    occursMonthly,
  ] = watch([
    "topic",
    "timezone",
    "recurring",
    "recurringType",
    "repeatInterval",
    "occursWeekly",
    "occursMonthly",
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error} />}
      <Container>
        <Label htmlFor="topic" label="Topic" required>
          <Input
            id="topic"
            type="text"
            variant="inline"
            inputsize="small"
            placeholder="Add Value"
            error={has(errors, ["topic", "message"])}
            value={topic}
            {...register("topic")}
          />
        </Label>

        <Label htmlFor="datetime" label="Date/time" required>
          <DateInput
            id="datetime"
            placeholder="DD/MM/YYYY at HH:mm"
            error={has(errors, ["datetime", "message"])}
            onChange={(date) => setValue('datetime', date[0])}
          />
        </Label>

        <Label htmlFor="timezone" label="Time zone" required>
          <Select
            id="timezone"
            value={timezone}
            showInternalSearch
            error={has(errors, ["timezone", "message"])}
            options={getTimeZoneOptions()}
            onChange={(option) => setValue("timezone", option.value)}
          />
        </Label>

        <Label htmlFor="recurring" label="Frequency">
          <Checkbox
            id="recurring"
            label="Recurring"
            checked={recurring}
            onChange={() => setValue("recurring", !recurring)}
          />
        </Label>

        {recurring && (
          <Label htmlFor="recurringType" label="Recurrence" required>
            <Select
              id="recurringType"
              value={recurringType}
              error={has(errors, ["recurringType", "message"])}
              options={[
                getOption<number>(1, "Daily"),
                getOption<number>(2, "Weekly"),
                getOption<number>(3, "Monthly"),
              ]}
              onChange={(option) => setValue("recurringType", option.value)}
            />
          </Label>
        )}

        {recurring && (
          <Label htmlFor="repeatInterval" label="Repeat every" required>
            <Select
              id="repeatInterval"
              value={repeatInterval}
              error={has(errors, ["repeatInterval", "message"])}
              options={getRepeatIntervalOptions(recurringType)}
              onChange={(option) => setValue("repeatInterval", option.value)}
            />
          </Label>
        )}

        {recurring && (recurringType === 2) && (
          <Label htmlFor="occursWeekly" label="Occurs on">
            <Select
              id="occursWeekly"
              value={occursWeekly}
              closeOnSelect={false}
              error={has(errors, ["occursWeekly", "message"])}
              options={Object.keys(DAYS).map((day) => ({
                ...getOption(DAYS[day], DAY_NAMES[day]),
                description: day,
              }))}
              onChange={(o) => {
                if (o.value) {
                  const selectedLabels = Array.isArray(occursWeekly) ? occursWeekly : [];
                  const newValue = selectedLabels.includes(o.value)
                    ? selectedLabels.filter((name) => name !== o.value)
                    : [...selectedLabels, o.value];

                  setValue("occursWeekly", newValue);
                }
              }}
            />
          </Label>
        )}

        {recurring && (recurringType === 3) && (
          <Label id="occursMonthly" label="Occurs on day of the month">
            <Select
              id="occursMonthly"
              value={occursMonthly}
              options={getOccursMonthlyOptions()}
              error={has(errors, ["occursMonthly", "message"])}
              onChange={(o) => setValue("occursMonthly", o.value)}
            />
          </Label>
        )}

        {recurring && (
          <Label htmlFor="endDatetime" label="End date" required>
            <DateInput
              id="endDatetime"
              placeholder="DD/MM/YYYY at HH:mm"
              error={has(errors, ["endDatetime", "message"])}
              onChange={(date) => setValue("endDatetime", date[0])}
            />
          </Label>
        )}

        <Stack justify="space-between">
          <Button
            type="submit"
            text="Add"
            disabled={isSubmitting}
            loading={isSubmitting}
          />
          <Button
            type="button"
            text="Cancel"
            intent="tertiary"
            onClick={onCancel}
          />
        </Stack>
      </Container>
    </form>
  );
};

export { ScheduleMeetingForm };
