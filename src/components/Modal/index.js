import React from "react";

export default function Modal({ children, showModal }) {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black/50 duration-200 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      } `}
    >
      <div className=" h-fit w-96 items-center rounded-lg bg-lighter px-8 py-6 text-gray">
        {children}
      </div>
    </div>
  );
}
