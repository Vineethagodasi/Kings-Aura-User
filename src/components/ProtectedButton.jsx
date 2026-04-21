// components/ProtectedButton.jsx

import { useNavigate } from "react-router-dom";
import { showError } from "../utils/toast";

function ProtectedButton({ onClick, children, classNames, addCartCss }) {
  const navigate = useNavigate();

  const buttonCss = `mt-5 w-full border border-primaryDark text-md rounded-lg py-3 
               flex items-center justify-center gap-2
               text-primaryDark font-medium
               transition-all duration-300
               hover:bg-primary hover:text-black`;

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showError(
        `${addCartCss ? "Please login to add items to cart" : "Please login to add items to wishlist"}`,
      );
      navigate("/login");
      return;
    }

    onClick(); // user is logged in
  };

  return (
    <button
      onClick={handleClick}
      className={`${addCartCss ? buttonCss : classNames}`}
    >
      {children}
    </button>
  );
}

export default ProtectedButton;
