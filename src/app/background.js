"use client";

import React, { useRef, useState } from "react";

export default function Background({ children }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className="min-h-screen flex p-5 overflow-hidden animate-border bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%]">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex-1 rounded-xl border-4 border-solid border-sky-50 to-slate-950 bg-gradient-to-tr from-slate-800"
      >
        <div
          className="pointer-events-none overflow-hidden absolute inset-0 opacity-0 transition duration-300 "
          style={{
            opacity,
            background: `radial-gradient(1000px circle at ${position.x}px ${position.y}px, rgba(37, 61, 171 ,.07), transparent 40%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
