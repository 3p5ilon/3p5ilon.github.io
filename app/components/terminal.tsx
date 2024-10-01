"use client";
import React, { useState, useRef, useEffect } from "react";

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([
    "A worldwide community of high school hackers. By the students, for the students.",
    "Type help to get started.",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  const processCommand = (cmd: string): void => {
    setOutput((prev) => [...prev, `guest:cnvctn ~ $ ${cmd}`]);
    switch (cmd.toLowerCase()) {
      case "help":
        setOutput((prev) => [
          ...prev,
          "help             list all commands (you're looking at it)",
          "about            learn about Conviction",
          "clear            clear the terminal",
        ]);
        break;
      case "about":
        setOutput((prev) => [
          ...prev,
          "We are an open-source AI research and deployment company.",
          "Our mission is to democratize AI by becoming the Linux of AI,",
          "making everything—from model weights to data pipelines—fully",
          "open and accessible to everyone.",
        ]);
        break;
      case "clear":
        setOutput([]);
        break;
      default:
        setOutput((prev) => [...prev, `Command not found: ${cmd}`]);
    }
  };

  return (
    <div className="bg-black text-[#87FF5F] font-mono text-sm h-screen overflow-y-auto">
      <pre className="text-white mb-4">
        {`
    __  __           __   _____                     
   / / / /___ ______/ /__/ ___/____  ____ _________ 
  / /_/ / __ \`/ ___/ //_/\\__ \\/ __ \\/ __ \`/ ___/ _ \\
 / __  / /_/ / /__/ ,<  ___/ / /_/ / /_/ / /__/  __/
/_/ /_/\\__,_/\\___/_/|_|/____/ .___/\\__,_/\\___/\\___/ 
                           /_/                      
`}
      </pre>
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
