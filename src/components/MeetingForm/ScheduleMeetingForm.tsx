import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Input, Checkbox } from "@deskpro/deskpro-ui";
import { DateInput } from "@deskpro/app-sdk";
import { DAYS, DAY_NAMES } from "@/constants";
import { getTimeZoneOptions, getOption } from "@/utils";
import {
  getInitScheduleValues,
  scheduleValidationSchema,
  getRepeatIntervalOptions,
  getOccursMonthlyOptions,
} from "./utils";
import { ErrorBlock } from "@/components/Error";
import { Label, Select, Button, Container } from "@/components/common";
import { recurrence } from "./types";
import type { FC } from "react";
import type { RecurrenceTypes } from "@/services/zoom/types";
import type { ScheduleFormProps, ScheduleFormValidationSchema } from "./types";

const ScheduleMeetingForm: FC<ScheduleFormProps> = ({
  onSubmit,
  onCancel,
  error,
}) => {
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
            error={Boolean(errors?.topic?.message)}
            value={topic}
            {...register("topic")}
          />
        </Label>

        <Label htmlFor="datetime" label="Date/time" required>
          <DateInput
            enableTime
            id="datetime"
            placeholder="DD/MM/YYYY at HH:mm"
            error={Boolean(errors?.datetime?.message)}
            onChange={(date) => setValue("datetime", date[0])}
          />
        </Label>

        <Label htmlFor="timezone" label="Time zone" required>
          <Select
            id="timezone"
            value={timezone}
            showInternalSearch
            error={Boolean(errors?.timezone?.message)}
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
              error={Boolean(errors?.recurringType?.message)}
              options={[
                getOption<number/*RecurrenceTypes*/>(recurrence.DAILY, "Daily"),
                getOption<number/*RecurrenceTypes*/>(recurrence.WEEKLY, "Weekly"),
                getOption<number/*RecurrenceTypes*/>(recurrence.MONTHLY, "Monthly"),
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
              error={Boolean(errors?.repeatInterval?.message)}
              options={getRepeatIntervalOptions(
                recurringType as RecurrenceTypes
              )}
              onChange={(option) => setValue("repeatInterval", option.value)}
            />
          </Label>
        )}

        {recurring && recurringType === recurrence.WEEKLY && (
          <Label htmlFor="occursWeekly" label="Occurs on">
            <Select<number>
              id="occursWeekly"
              value={occursWeekly}
              closeOnSelect={false}
              error={Boolean(errors?.occursWeekly?.message)}
              options={Object.keys(DAYS).map((day) => ({
                ...getOption<number>(DAYS[day], DAY_NAMES[day]),
                description: day,
              }))}
              onChange={(o) => {
                if (o.value) {
                  const selectedLabels = Array.isArray(occursWeekly)
                    ? occursWeekly
                    : [];
                  const newValue = selectedLabels.includes(o.value)
                    ? selectedLabels.filter((name) => name !== o.value)
                    : [...selectedLabels, o.value];

                  setValue("occursWeekly", newValue);
                }
              }}
            />
          </Label>
        )}

        {recurring && recurringType === recurrence.MONTHLY && (
          <Label id="occursMonthly" label="Occurs on day of the month">
            <Select
              id="occursMonthly"
              value={occursMonthly}
              options={getOccursMonthlyOptions()}
              error={Boolean(errors?.occursMonthly?.message)}
              onChange={(o) => setValue("occursMonthly", o.value)}
            />
          </Label>
        )}

        {recurring && (
          <Label htmlFor="endDatetime" label="End date" required>
            <DateInput
              id="endDatetime"
              placeholder="DD/MM/YYYY at HH:mm"
              error={Boolean(errors?.endDatetime?.message)}
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
