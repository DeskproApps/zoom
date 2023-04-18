/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

/** Deskpro */
export const ACCESS_TOKEN_PATH = "oauth/global/access_token";
export const ACCESS_TOKEN = `[user[${ACCESS_TOKEN_PATH}]]`;
export const REFRESH_TOKEN_PATH = "oauth/global/refresh_token";
export const REFRESH_TOKEN = `[user[${REFRESH_TOKEN_PATH}]]`;

export const placeholders = {
  client_id: "__client_id__",
  client_secret: "__client_secret__",
};

/** Zoom */
export const REST_URL = "https://api.zoom.us/v2";

export const DAYS: Record<string, number> = {
  Sun: 1,
  Mon: 2,
  Tue: 3,
  Wed: 4,
  Thu: 5,
  Fri: 6,
  Sat: 7,
};

export const DAY_NAMES: Record<string, string> = {
  Sun: "Sunday",
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};
