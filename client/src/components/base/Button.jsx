import React from "react";

const base =
  "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-empirica-500";
const prim =
  "border-transparent shadow-sm text-white bg-empirica-600 hover:bg-empirica-700";
const sec = "border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50";

export function Button({
  children,
  handleClick = null,
  className = "",
  primary = false,
  type = "button",
  autoFocus = false,
  full = false,
}) {
  let cn = `${base} ${primary ? prim : sec} ${className}`;

  if (full) {
    cn += " w-full";
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={cn}
      autoFocus={autoFocus}
    >
      {children}
    </button>
  );
}
