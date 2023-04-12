import type { Dict, DateTime } from "../../types";

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

export type MeetingTypes =
  | 1 // Instant meeting.
  | 2 // Scheduled meeting.
  | 3 // Recurring meeting with no fixed time.
  | 8 // Recurring meeting with a fixed time.
;

export type MeetingItem = {
  uuid: string,
  id: number,
  host_id: string,
  topic: string,
  type: MeetingTypes,
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
  meetings: MeetingItem[],
};

//
export type OccurrenceItem = {
  occurrence_id: string,
  start_time: DateTime,
  duration: number,
  status: string,
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

export type MeetingDetails = {
  id: number,
  uuid: string,
  host_id: User["id"]
  host_email: User["email"],
  assistant_id: User["id"],
  topic: string,
  type: MeetingTypes,
  status: string, // "waiting",
  timezone: DateTime,
  agenda: string,
  created_at: DateTime,
  start_url: string,
  join_url: string,
  password: string,
  h323_password: string,
  pstn_password: string,
  encrypted_password: string,
  occurrences: OccurrenceItem[],
  settings: Dict< never>,
  recurrence: Recurrence,
  pre_schedule: boolean,
}
  ;
