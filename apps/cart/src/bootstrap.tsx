import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

Sentry.init({
  dsn: "ваш_DSN",
  sendDefaultPii: true,
});

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Sentry.ErrorBoundary fallback={<h2>Что-то пошло не так</h2>}>
        <App />
      </Sentry.ErrorBoundary>
    </React.StrictMode>
  );
}
