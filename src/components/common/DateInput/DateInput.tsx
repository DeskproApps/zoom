import styled from "styled-components";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Flatpickr from 'react-flatpickr';
import { Input } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import type { FC } from "react";
import type { DatePickerProps } from "@deskpro/app-sdk";
import "./DateInput.css";

export type Props = DatePickerProps & {
  id: string;
  error: boolean,
  value?: string,
  required?: boolean,
  placeholder?: string,
  onChange: (date: [Date]) => void,
}

const StyledInput = styled(Input)`
  :read-only {
    cursor: pointer;
  }
`;

const DateInput: FC<Props> = ({
  id,
  error,
  onChange,
  placeholder,
}) => {
  const { theme } = useDeskproAppTheme();

  return (
    <Flatpickr
      options={{
        position: "auto",
        dateFormat: "j F Y H:i",
        minuteIncrement: 5,
        enableTime: true,
        time_24hr: true,
      }}
      defaultValue=""
      onChange={onChange}
      render={({defaultValue, ...props}, ref) => (
        <StyledInput
          {...props}
          id={id}
          ref={ref}
          variant="inline"
          inputsize="small"
          placeholder={placeholder}
          defaultValue={defaultValue || ''}
          error={error}
          style={{ paddingRight: 0 }}
          rightIcon={{
            icon: faCalendarDays,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            style: {
              color: theme.colors.grey40,
            }
          }}
        />
      )}
    />
  )
};

export { DateInput };
