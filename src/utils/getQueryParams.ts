import { createSearchParams } from "react-router-dom";
import isEmpty from "lodash.isempty";
import isString from "lodash.isstring";
import startsWith from "lodash.startswith";
import isPlainObject from "lodash.isplainobject";
import type { ParamKeyValuePair } from "react-router-dom";
import type { Dict, RequestParams } from "../types";

const getQueryParams = (data?: RequestParams["queryParams"]): string => {
  if (isEmpty(data)) {
    return "";
  }

  if (isString(data)) {
    return startsWith(data, "?") ? data : `?${data}`;
  }

  if (Array.isArray(data)) {
    return `?${createSearchParams(data)}`
  }

  if (isPlainObject(data)) {
    const parsedQueryParams = Object.keys(data as Dict<string>).map<ParamKeyValuePair>((key) => ([key, (data as Dict<string>)[key]]));
    return `?${createSearchParams(parsedQueryParams)}`;
  }

  return "";
};

export { getQueryParams };
