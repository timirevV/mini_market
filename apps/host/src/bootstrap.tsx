import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { GlobalStyle } from "./GlobalStyle";

function injectPWAElements() {
  if (!document.querySelector('link[rel="manifest"]')) {
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = "/manifest.json";
    document.head.appendChild(link);
  }

  if (!document.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#1976d2";
    document.head.appendChild(meta);
  }

  if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
    const meta = document.createElement("meta");
    meta.name = "mobile-web-app-capable";
    meta.content = "yes";
    document.head.appendChild(meta);
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }
}

injectPWAElements();
registerServiceWorker();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          const { default: Catalog } = await import("catalog/Catalog");
          return { Component: Catalog };
        },
      },
      {
        path: "cart",
        async lazy() {
          const { default: Cart } = await import("cart/Cart");
          return { Component: Cart };
        },
      },
    ],
  },
]);

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
