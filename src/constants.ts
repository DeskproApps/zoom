export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

/** Deskpro */
export const TOKEN_PATH = "oauth/global/access_token";
export const TOKEN = `[user[${TOKEN_PATH}]]`;

export const placeholders = {
  client_id: "__client_id__",
  client_secret: "__client_secret__",
};

/** Zoom */
export const REST_URL = "https://api.zoom.us/v2";
