export const Logo = `
    __  __           __   _____                     
   / / / /___ ______/ /__/ ___/____  ____ _________ 
  / /_/ / __ \`/ ___/ //_/\\__ \\/ __ \\/ __ \`/ ___/ _ \\
 / __  / /_/ / /__/ ,<  ___/ / /_/ / /_/ / /__/  __/
/_/ /_/\\__,_/\\___/_/|_|/____/ .___/\\__,_/\\___/\\___/ 
                           /_/                      
`;

export const Description = [
  "A place where teens built cool shit!",
  "Type help to get started.",
];

export const Commands = (cmd: string, setOutput: React.Dispatch<React.SetStateAction<string[]>>): void => {
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