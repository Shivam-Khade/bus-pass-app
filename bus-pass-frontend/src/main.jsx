import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UIProvider } from "./context/UIContext";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <UIProvider>
        <App />
      </UIProvider>
    </MantineProvider>
  </React.StrictMode>
);
