import React from "react";
import { FaAngleUp } from "react-icons/fa";

export default function ToTop({ className }) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={`to-top fixed -bottom-9 right-3 rounded-full bg-primary shadow-lg ${className}`}
      onClick={handleScrollToTop}
    >
      <span className="block p-3 text-2xl text-lightest">
        <FaAngleUp />
      </span>
    </button>
  );
}
