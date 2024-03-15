import { useState, useMemo } from "react";
import { get, toLower } from "lodash";
import {
  faCheck,
  faCaretDown,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DivAsInput } from "@deskpro/deskpro-ui";
import type { ReactNode } from "react";
import type {
  LabelProps,
  DropdownProps,
  DropdownTargetProps,
  DivAsInputWithDisplayProps,
} from "@deskpro/deskpro-ui";
import type { Option } from "../../../types";

type Props<T> = Pick<DropdownProps<T, HTMLElement>, "closeOnSelect"> & {
  id: string;
  error?: DivAsInputWithDisplayProps["error"];
  value?: T | T[];
  options: Option<T>[];
  onChange: (o: Option<T>) => void;
  placeholder?: DivAsInputWithDisplayProps["placeholder"];
  showInternalSearch?: boolean;
  required?: LabelProps["required"];
};

const Select = <T,>({
  id,
  error,
  value,
  options,
  onChange,
  required,
  placeholder,
  showInternalSearch,
  ...props
}: Props<T>) => {
  const [input, setInput] = useState<string>("");

  const displayValue = useMemo(() => {
    if (Array.isArray(value)) {
      return options
        .filter((o) => value.includes(o.value))
        .map((o) => o.description)
        .join(", ");
    } else {
      const o = options.find((o) => o.value === value);
      return get(o, ["label"], value);
    }
  }, [value, options]) as ReactNode;

  return (
    <Dropdown
      showInternalSearch={showInternalSearch}
      fetchMoreText={"Fetch more"}
      autoscrollText={"Autoscroll"}
      selectedIcon={faCheck}
      externalLinkIcon={faExternalLinkAlt}
      placement="bottom-start"
      hideIcons
      inputValue={input}
      onSelectOption={(selectedOption) => {
        setInput("");
        onChange(selectedOption);
      }}
      onInputChange={(value) => {
        if (showInternalSearch) {
          setInput(value);
        }
      }}
      options={options
        .filter((o) =>
          toLower(get(o, ["label"], "") as string).includes(input.toLowerCase())
        )
        .map((o) => ({
          ...o,
          selected: Array.isArray(value)
            ? value.includes(o.value)
            : o.value === value,
        }))}
      containerMaxHeight={400}
      {...props}
    >
      {({ targetRef, targetProps }: DropdownTargetProps<HTMLDivElement>) => {
        return (
          <DivAsInput
            id={id}
            placeholder={placeholder || "Select Value"}
            variant="inline"
            rightIcon={faCaretDown}
            error={error}
            ref={targetRef}
            {...targetProps}
            value={displayValue}
            style={{ paddingRight: 0, cursor: "pointer" }}
          />
        );
      }}
    </Dropdown>
  );
};

export { Select };
