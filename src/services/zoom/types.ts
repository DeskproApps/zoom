import type { DateTime } from "../../types";

export type OAuthToken = {
  token_type: "bearer",
  access_token: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
};

export type ZoomRestError = {
  status: boolean,
  errorCode: number
  errorMessage: string,
  result: null,
};

export type User = {
  id: string,
  first_name: string,
  last_name: string,
  display_name: string,
  email: string,
  personal_meeting_url: string,
  timezone: string,
  language: string,
  created_at: DateTime,
  user_created_at: DateTime,
  last_login_time: DateTime,
  account_number: number,
  pmi: number,
};
