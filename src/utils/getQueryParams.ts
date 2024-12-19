import { createSearchParams } from "react-router-dom";
import type { ParamKeyValuePair } from "react-router-dom";
import type { Dict, RequestParams } from "@/types";

const getQueryParams = (data?: RequestParams["queryParams"]): string => {
  if (data === undefined) {
    return '';
  }

  if (typeof data === 'string') {
    return data.startsWith("?") ? data : `?${data}`;
  }

  if (Array.isArray(data)) {
    return `?${createSearchParams(data)}`
  }

  const parsedQueryParams = Object.keys(data as Dict<string>).map<ParamKeyValuePair>((key) => ([key, (data as Dict<string>)[key]]));
  return `?${createSearchParams(parsedQueryParams)}`;
};

export { getQueryParams };
