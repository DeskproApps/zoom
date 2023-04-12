import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@deskpro/app-sdk";
import { Input } from "@deskpro/deskpro-ui";
import { getTimeZoneOptions } from "../../utils";
import { getInitInstantValues, instantValidationSchema } from "./utils";
import { ErrorBlock } from "../Error";
import {
  Label,
  Select,
  Button,
  DateInput,
  Container,
} from "../common";
import type { FC } from "react";
import type { InstantFormProps, InstantFormValidationSchema } from "./types";

const InstantMeetingForm: FC<InstantFormProps> = ({ onSubmit, onCancel, error }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InstantFormValidationSchema>({
    defaultValues: getInitInstantValues(),
    resolver: zodResolver(instantValidationSchema),
  });

  const [topic, timezone] = watch(["topic", "timezone"]);

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

export { InstantMeetingForm };