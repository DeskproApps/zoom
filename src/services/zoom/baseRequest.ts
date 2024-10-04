import { V2ProxyRequestInit, proxyFetch } from "@deskpro/app-sdk";
import { refreshTokenService } from "./refreshTokenService";
import { REST_URL, ACCESS_TOKEN } from "../../constants";
import { getQueryParams } from "../../utils";
import { setAccessTokenService, setRefreshTokenService } from "../deskpro";
import { ZoomError } from "./ZoomError";
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
  const params = getQueryParams(queryParams);

  const requestUrl = `${baseUrl}${params}`;
  const options: V2ProxyRequestInit = {
    method,
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
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

  let res = await dpFetch(requestUrl, options);

  if (res.status === 401) {
    const data = await refreshTokenService(client);

    await setAccessTokenService(client, data);
    await setRefreshTokenService(client, data);

    res = await dpFetch(requestUrl, options);
  }

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

export {baseRequest};
