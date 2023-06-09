import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

enum QueryKey {
  ME = "me",
  MEETINGS = "meetings",
  INSTANT_MEETINGS = "instantMeetings",
}

export { queryClient, QueryKey };
