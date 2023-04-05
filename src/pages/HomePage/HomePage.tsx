import { useDeskproElements } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import type { FC } from "react";

const HomePage: FC = () => {
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

  return (
    <>
      HomePage
    </>
  );
};

export { HomePage };
