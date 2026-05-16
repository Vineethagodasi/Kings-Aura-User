// components/ProtectedButton.jsx

import { useNavigate } from "react-router-dom";
import { showError } from "../utils/toast";

function ProtectedButton({ onClick, children, classNames, addCartCss, buyNow, disabled }) {
  const navigate = useNavigate();

  const buttonCss = `mt-5 w-full border border-primaryDark text-md rounded-lg py-3 
               flex items-center justify-center gap-2
               text-primaryDark font-medium
               transition-all duration-300
               hover:bg-primary hover:text-black`;

  const handleClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
       let message = "";

    if (buyNow) {
      message = "Please login to buy this product";
    } else if (addCartCss) {
      message = "Please login to add items to cart";
    } else {
      message = "Please login to add items to wishlist";
    }

    showError(message);
      navigate("/login");
      return;
    }

    onClick(); // user is logged in
  };

  return (
    <button
      onClick={handleClick}
      className={`${addCartCss ? buttonCss : classNames} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ProtectedButton;
