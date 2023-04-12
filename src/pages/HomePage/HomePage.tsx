import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useMeetings } from "./hooks";
import { Home } from "../../components/Home";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, meetings } = useMeetings();

  useSetTitle("Zoom Meetings");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Log Out", payload: { type: "logout" } },
      ],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home meetings={meetings} />
  );
};

export { HomePage };
