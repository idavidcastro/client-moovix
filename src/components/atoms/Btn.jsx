import React from "react";

export default function Btn({ name, onClick, className }) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {name}
    </button>
  );
}
