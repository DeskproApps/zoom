import React, { FC, useState } from "react";
import get from "lodash.get";
import toLower from "lodash.tolower";
import {
  faCheck,
  faCaretDown,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  LabelProps,
  DivAsInput,
  DivAsInputWithDisplayProps,
} from "@deskpro/deskpro-ui";
import {
  Dropdown,
  DropdownTargetProps,
} from "@deskpro/app-sdk";
import type { Option } from "../../../types";

type Props = {
  id: string,
  label?: string,
  error?: DivAsInputWithDisplayProps["error"],
  value: Option<string>["value"],
  options: Option<string>[],
  onChange: (o: Option<string>) => void,
  placeholder?: DivAsInputWithDisplayProps["placeholder"],
  showInternalSearch?: boolean,
  required?: LabelProps["required"],
};

const SingleSelect: FC<Props> = ({
  id,
  label,
  error,
  value,
  options,
  onChange,
  required,
  placeholder,
  showInternalSearch,
  ...props
}) => {
  const [input, setInput] = useState<string>("");

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
        .filter((o) => toLower(get(o, ["label"], "") as string).includes(input.toLowerCase()))
        .map((o) => ({ ...o, selected: o.value === value }))
      }
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
              value={value}
              style={{ paddingRight: 0, cursor: "pointer" }}
            />
        )
      }}
    </Dropdown>
  );
};

export { SingleSelect };
