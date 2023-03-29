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
import { isNavigatePayload } from "./utils";
import { Main, AdminPage } from "./pages";
import { ErrorFallback } from "./components";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("logout", () => console.log(">>> logout"))
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

  if (!client) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/admin/callback" element={<AdminPage/>} />
          <Route index element={<Main/>} />
        </Routes>
      </ErrorBoundary>
      <br/><br/><br/>
    </Suspense>
  );
}

export default App;
