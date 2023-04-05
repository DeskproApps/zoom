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

export type Recurrence = {
  type:
    | 1 // Daily
    | 2 // Weekly
    | 3 // Monthly
  repeat_interval: number,
  end_date_time: DateTime,
  weekly_days?: string,
  monthly_day?: number,
};

export type MeetingType =
  | 1 // Instant meeting.
  | 2 // Scheduled meeting.
  | 3 // Recurring meeting with no fixed time.
  | 8 // Recurring meeting with a fixed time.
;

export type Meeting = {
  uuid: string,
  id: number,
  host_id: string,
  topic: string,
  type: MeetingType,
  start_time: DateTime,
  duration: number,
  timezone: string,
  created_at: DateTime,
  join_url: string,
};

export type Meetings = {
  page_size: number,
  total_records: number,
  next_page_token: "",
  meetings: Meeting[],
};
