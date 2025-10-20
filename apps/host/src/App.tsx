import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export const App = () => {
  return (
    <>
      <Header />

      <div style={{ padding: 40 }}>
        <Outlet />
      </div>
    </>
  );
};
