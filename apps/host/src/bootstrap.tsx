import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { GlobalStyle } from "./GlobalStyle";

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
