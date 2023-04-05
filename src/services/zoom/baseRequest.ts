import { createSearchParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { proxyFetch } from "@deskpro/app-sdk";
import { REST_URL, TOKEN } from "./constants";
import { ZoomError } from "./ZoomError";
import type { ParamKeyValuePair } from "react-router-dom";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
    url,
    rawUrl,
    data = {},
    method = "GET",
    queryParams = {},
    headers: customHeaders
}) => {
    const dpFetch = await proxyFetch(client);

    const baseUrl = rawUrl ? rawUrl : `${REST_URL}${url}`;
    const parsedQueryParams = Array.isArray(queryParams)
        ? queryParams
        : Object.keys(queryParams).map<ParamKeyValuePair>((key) => ([key, queryParams[key]]));
    const params = `${isEmpty(parsedQueryParams) ? "" : `?${createSearchParams(parsedQueryParams)}`}`;
    const requestUrl = `${baseUrl}${params}`;
    const options: RequestInit = {
        method,
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "X-Proxy-Origin": "", // Empty value so as not to trigger Zoom's CORS response
            ...customHeaders,
        },
    };

    if (data instanceof FormData) {
        options.body = data;
    } else if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };
    }

    const res = await dpFetch(requestUrl, options);

    if (res.status < 200 || res.status > 399) {
        throw new ZoomError({
            status: res.status,
            data: await res.json(),
        });
    }

    try {
      return await res.json();
    } catch (e) {
      return {};
    }
};

export { baseRequest };
