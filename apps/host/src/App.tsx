import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Cart = React.lazy(() => import("cart/Cart"));
const Catalog = React.lazy(() => import("catalog/Catalog"));

export const App = () => {
  return (
    <BrowserRouter>
      <nav
        style={{ display: "flex", gap: 20, padding: 20, background: "#1976d2" }}
      >
        <Link style={{ color: "white" }} to="/">
          🏠 Главная
        </Link>
        <Link style={{ color: "white" }} to="/catalog">
          📦 Каталог
        </Link>
        <Link style={{ color: "white" }} to="/cart">
          🛒 Корзина
        </Link>
      </nav>

      <div style={{ padding: 40 }}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route
              path="/"
              element={<h2>👋 Добро пожаловать в Mini Market!</h2>}
            />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};
