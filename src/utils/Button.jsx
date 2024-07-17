import React from "react";

const Button = ({ title, className, onClick }) => {
  return (
    <button className={`px-6 py-2 rounded-full ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
