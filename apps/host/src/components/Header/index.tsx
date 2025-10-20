import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartSum, setCartSum] = useState<number>(0);

  useEffect(() => {
    const savedSum = localStorage.getItem("cartTotal");
    if (savedSum) {
      setCartSum(parseInt(savedSum));
    }

    const handleCartUpdate = () => {
      const newSum = localStorage.getItem("cartTotal");
      if (newSum) {
        setCartSum(parseInt(newSum));
      }
    };

    window.addEventListener("cartUpdate", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdate", handleCartUpdate);
    };
  }, []);
  return (
    <nav
      style={{ display: "flex", gap: 20, padding: 20, background: "#1976d2" }}
    >
      <Link style={{ color: "white" }} to="/">
        Каталог
      </Link>
      <Link style={{ color: "white" }} to="/cart">
        Корзина {cartSum > 0 ? `(${cartSum} руб)` : ""}
      </Link>
    </nav>
  );
};

export default Header;
