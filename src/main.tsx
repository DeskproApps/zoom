import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { DeskproAppProvider } from "@deskpro/app-sdk";

import App from "./App";

import "iframe-resizer/js/iframeResizer.contentWindow";
import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render((
  <React.StrictMode>
    <DeskproAppProvider>
      <HashRouter>
        <App/>
      </HashRouter>
    </DeskproAppProvider>
  </React.StrictMode>
));
