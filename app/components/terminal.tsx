"use client";
import React, { useState, useRef, useEffect } from "react";
import { Logo, Description, Commands } from "./content";

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>(Description);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    Commands(input, setOutput);
    setInput("");
  };

  return (
    <div className="bg-black text-[#87FF5F] overflow-y-auto text-[15px]">
      <pre className="text-white mb-5 text-sm">{Logo}</pre>
      {output.map((line, index) => (
        <div
          key={index}
          className={line.startsWith("guest:cnvctn ~ $") ? "mt-4" : ""}
        >
          {line}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex mt-4 items-center">
        <span className="mr-2">guest:cnvctn ~ $</span>
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="bg-transparent w-full outline-none pl-3 caret-transparent"
            autoFocus
          />
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#87FF5F] animate-pulse" />
        </div>
      </form>
    </div>
  );
};

export default Terminal;