"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  onClick?: ()=>void;
  disabled?:boolean
}

export const Button = ({ children, className,onClick, appName ,disabled}: ButtonProps) => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
