export const Logo = `
    __  __           __   _____                     
   / / / /___ ______/ /__/ ___/____  ____ _________ 
  / /_/ / __ \`/ ___/ //_/\\__ \\/ __ \\/ __ \`/ ___/ _ \\
 / __  / /_/ / /__/ ,<  ___/ / /_/ / /_/ / /__/  __/
/_/ /_/\\__,_/\\___/_/|_|/____/ .___/\\__,_/\\___/\\___/ 
                           /_/                      
`;

export const Description = [
  `A place where teens built cool shit!`,
  `Type <span class="text-[#5FAFFF]">help</span> to get started.`,
];

export const Commands = (
  cmd: string,
  setOutput: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  const commandOutput = `<div class="mt-4">hacker<span class="text-[#AFAFFF]">:cnvctn</span> <span class="text-[#FF5F00]">~</span> $ ${cmd}</div>`;
  setOutput((prev) => [...prev, commandOutput]);

  switch (cmd.toLowerCase()) {
    case "help":
      setOutput((prev) => [
        ...prev,
        `<div class="flex"><span class="text-white w-40">about</span> <span class="text-[#AFAFFF]">learn about Conviction</span></div>`,
        `<div class="flex"><span class="text-white w-40">social</span> <span class="text-[#AFAFFF]">social networks</span></div>`,
        `<div class="flex"><span class="text-white w-40">clear</span> <span class="text-[#AFAFFF]">clear the terminal</span></div>`,
      ]);
      break;
    case "about":
      setOutput((prev) => [
        ...prev,
        `<span class="text-[#AFAFFF]">A place where teens built cool shit!</span>`,
      ]);
      break;
    case "social":
      setOutput((prev) => [
        ...prev,
        `<div class="flex"><span class="text-white w-40">twitter</span> <span class="text-[#AFAFFF]"><a href="https://x.com/_hackspace" target="blank">twitter account</a></span></div>`,
        `<div class="flex"><span class="text-white w-40">discord</span> <span class="text-[#AFAFFF]"><a href="https://x.com/_hackspace" target="blank">hackspace community</a></span></div>`,
        `<div class="flex"><span class="text-white w-40">github</span> <span class="text-[#AFAFFF]"><a href="https://x.com/_hackspace" target="blank">github profile</a></span></div>`,
        `<div class="flex"><span class="text-white w-40">instagram</span> <span class="text-[#AFAFFF]"><a href="https://x.com/_hackspace" target="blank">instagram account</a></span></div>`,
        `<div class="flex"><span class="text-white w-40">youtube</span> <span class="text-[#AFAFFF]"><a href="https://x.com/_hackspace" target="blank">youtube channel</a></span></div>`,
      ]);
      break;
    case "clear":
      setOutput([]);
      break;
    default:
      setOutput((prev) => [
        ...prev,
        `Command not found: ${cmd}. Try <span class="text-[#FF5F00]">'help'</span> to get started.`,
      ]);
  }
};
