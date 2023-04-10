import { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useLogout } from "./hooks";
import { isNavigatePayload } from "./utils";
import {
  HomePage,
  LoginPage,
  AdminPage,
  LoadingAppPage,
  CreateInstantMeetingPage,
  CreateScheduleMeetingPage,
} from "./pages";
import { ErrorFallback } from "./components";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { isLoading: isLoadingLogout, logout } = useLogout();

  const isLoading = [isLoadingLogout].some((isLoading) => isLoading);

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("logout", logout)
      .run();
  }, 500);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/admin/callback" element={<AdminPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/create-instant-meeting" element={<CreateInstantMeetingPage/>} />
          <Route path="/create-schedule-meeting" element={<CreateScheduleMeetingPage/>} />
          <Route index element={<LoadingAppPage/>} />
        </Routes>
      </ErrorBoundary>
      <br/><br/><br/>
    </Suspense>
  );
}

export default App;
