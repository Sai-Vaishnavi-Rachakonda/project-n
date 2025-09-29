import React from "react";

export default function Chevron({ active }) {
  return (
    <svg
      className={"chevron" + (active ? " is-active" : "")}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle className="chev-bg" cx="12" cy="12" r="11" />
      <path
        className="chev-arrow"
        d="M8 10l4 4 4-4"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


