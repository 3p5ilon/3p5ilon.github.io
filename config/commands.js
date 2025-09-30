const about =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";
const timeUnit = 1000; // useful for development, set to 10 to run faster, set to 1000 for production
let killed = false;

const commands = {
  help: function () {
    const maxCmdLength = Math.max(...Object.keys(help).map((x) => x.length));
    Object.entries(help).forEach(function (kv) {
      const cmd = kv[0];
      const desc = kv[1];
      if (term.cols >= 80) {
        const rightPad = maxCmdLength - cmd.length + 2;
        const sep = " ".repeat(rightPad);
        term.stylePrint(`${cmd}${sep}${desc}`);
      } else {
        if (cmd != "help") {
          term.writeln("");
        }
        term.stylePrint(cmd);
        term.stylePrint(desc);
      }
    });
  },

  whois: function () {
    term.stylePrint(about);
  },

  projects: function (args) {
    const projectKeys = Object.keys(projects);

    if (!args[0]) {
      term.stylePrint("Usage: %projects% <project>\n");
      term.stylePrint(
        "projects may be outdated, see latest: https://3p5ilon.vercel.app/projects\n"
      );
      term.stylePrint("Available projects:\n");

      const maxNameLength = Math.max(
        ...projectKeys.map((p) => projects[p].name.length)
      );

      Object.entries(projects).forEach(([key, value]) => {
        const name = value.name;
        const desc = value.desc || "";

        if (term.cols >= 80) {
          const rightPad = maxNameLength - name.length + 2;
          const sep = " ".repeat(rightPad);
          term.stylePrint(`${name}${sep}${desc}`);
        } else {
          if (key != projectKeys[0]) term.writeln("");
          term.stylePrint(name);
          term.stylePrint(desc);
        }
      });
    } else {
      const project = args[0].toLowerCase();
      if (projects[project]) {
        const p = projects[project];
        term.stylePrint(p.link + "\n");
        term.stylePrint(p.desc);
      } else {
        term.stylePrint(`%projects%: ${project}: project not found\n`);
        term.stylePrint(
          "projects may be outdated, see latest: https://3p5ilon.vercel.app/projects\n"
        );
        term.stylePrint("Available projects:\n");

        const maxNameLength = Math.max(
          ...projectKeys.map((p) => projects[p].name.length)
        );
        Object.entries(projects).forEach(([key, value]) => {
          const name = value.name;
          const desc = value.desc || "";
          if (term.cols >= 80) {
            const rightPad = maxNameLength - name.length + 2;
            const sep = " ".repeat(rightPad);
            term.stylePrint(`${name}${sep}${desc}`);
          } else {
            if (key != projectKeys[0]) term.writeln("");
            term.stylePrint(name);
            term.stylePrint(desc);
          }
        });
      }
    }
  },

  social: function (args) {
    const networks = Object.keys(social);

    if (!args[0]) {
      term.stylePrint("Usage: %social% <network>\n");
      term.stylePrint("Available networks:\n");

      const maxNameLength = Math.max(
        ...networks.map((n) => social[n].name.length)
      );

      Object.entries(social).forEach(([key, value]) => {
        const name = value.name;
        const desc = value.desc || "";

        if (term.cols >= 80) {
          const rightPad = maxNameLength - name.length + 2;
          const sep = " ".repeat(rightPad);
          term.stylePrint(`${name}${sep}${desc}`);
        } else {
          if (key != networks[0]) term.writeln("");
          term.stylePrint(name);
          term.stylePrint(desc);
        }
      });
    } else {
      const network = args[0].toLowerCase();
      if (social[network]) {
        term.stylePrint(social[network].link);
      } else {
        term.stylePrint(`%social%: ${network}: network not found\n`);
        term.stylePrint("Available networks:\n");

        const maxNameLength = Math.max(
          ...networks.map((n) => social[n].name.length)
        );
        Object.entries(social).forEach(([key, value]) => {
          const name = value.name;
          const desc = value.desc || "";

          if (term.cols >= 80) {
            const rightPad = maxNameLength - name.length + 2;
            const sep = " ".repeat(rightPad);
            term.stylePrint(`${name}${sep}${desc}`);
          } else {
            if (key != networks[0]) term.writeln("");
            term.stylePrint(name);
            term.stylePrint(desc);
          }
        });
      }
    }
  },

  blog: function () {
    term.stylePrint("sometimes i write stuff, read it here:");
    term.stylePrint("https://3p5ilon.vercel.app/blog");
  },

  profile: function () {
    term.printArt("profile");
  },

  banner: function () {
    term.writeln("");
    if (term.printLogoType) {
      term.printLogoType();
    } else {
      term.writeln(term.cols >= 40 ? LOGO_TYPE : "[Epsilon CLI]\r\n");
    }
  },

  secret: function () {
    term.stylePrint("shh... you found a secret");
    term.openURL("https://users.ece.cmu.edu/~gamvrosi/thelastq.html");
  },

  email: function () {
    term.command("pine");
  },

  other: function () {
    term.stylePrint(
      "Yeah, I didn't literally mean %other%. I mean try some Linux commands"
    );
  },

  echo: function (args) {
    const message = args.join(" ");
    term.stylePrint(message);
  },

  say: function (args) {
    const message = args.join(" ");
    term.stylePrint(`(Robot voice): ${message}`);
  },

  pwd: function () {
    term.stylePrint("/" + term.cwd.replaceAll("~", `home/${term.user}`));
  },

  ls: function () {
    term.stylePrint(_filesHere().join("   "));
  },

  cd: function (args) {
    let dir = args[0] || "~";
    if (dir != "/") {
      dir = dir.replace(/\/$/, "");
    }

    switch (dir) {
      case "~":
        term.cwd = "~";
        break;
      case "..":
        if (term.cwd == "~") {
          term.command("cd /home");
        } else if (["home", "bin"].includes(term.cwd)) {
          term.command("cd /");
        }
        break;
      case "../..":
      case "../../..":
      case "../../../..":
      case "/":
        term.cwd = "/";
        break;
      case "home":
        if (term.cwd == "/") {
          term.command("cd /home");
        } else {
          term.stylePrint(
            `You do not have permission to access this directory`
          );
        }
        break;
      case "/home":
        term.cwd = "home";
        break;
      case "/bin":
        term.cwd = "bin";
        break;
      case "bin":
        if (term.cwd == "/") {
          term.cwd = "bin";
        } else {
          term.stylePrint(`No such directory: ${dir}`);
        }
        break;
      case ".":
        break;
      default:
        term.stylePrint(`No such directory: ${dir}`);
        break;
    }
  },

  zsh: function () {
    term.init(term.user);
  },

  cat: function (args) {
    const filename = args[0];

    if (_filesHere().includes(filename)) {
      term.writeln(getFileContents(filename));
    } else {
      term.stylePrint(`No such file: ${filename}`);
    }
    if (filename == "id_rsa") {
      term.openURL("https://youtu.be/dQw4w9WgXcQ?si=v6gpumClZDQc87zn");
    }
  },

  grep: function (args) {
    const q = args[0];
    const filename = args[1];

    if (filename == "id_rsa") {
      term.openURL("https://youtu.be/dQw4w9WgXcQ?si=v6gpumClZDQc87zn");
    }

    if (!q || !filename) {
      term.stylePrint("usage: %grep% <pattern> <file>");
      return;
    }

    if (_filesHere().includes(filename)) {
      var file = getFileContents(filename);
      const matches = file.matchAll(q);
      for (match of matches) {
        file = file.replaceAll(match[0], colorText(match[0], "files"));
      }
      term.writeln(file);
    } else {
      term.stylePrint(`No such file or directory: ${filename}`);
    }
  },

  groups: function (args) {
    const user = args[0];

    switch (user) {
      case "guest":
        term.stylePrint("guest: coffee_addicts, midnight_coders, meme_lords");
        break;
      case "epsilon":
        term.stylePrint(
          "epsilon: reading_fanatic, code_explorer, mischief_maker"
        );
        break;
      case "anon":
        term.stylePrint(
          "anon: late_night_coder, meme_archivist, claude_delegate"
        );
        break;
      default:
        if (user) {
          term.stylePrint(`%groups%: ${user}: no such user`);
        } else {
          term.stylePrint("usage: %groups% <user>");
        }
        break;
    }
  },

  gzip: function () {
    term.stylePrint(
      "What are you going to do with a zip file on a fake terminal, seriously?"
    );
  },

  free: function () {
    term.stylePrint("       total    used    free    available");
    term.stylePrint("Mem:    ∞       ∞       0       ∞");
    term.stylePrint("Swap:   0       0       0       0");
    term.stylePrint("\nmy memory is full of dreams, not RAM!");
  },

  tail: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  less: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  head: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  open: function (args) {
    if (!args.length) {
      term.stylePrint("usage: %open% <file>\n");
      term.stylePrint("example: %open% test.htm");
    } else if (
      args[0].split(".")[0] == "test" &&
      args[0].split(".")[1] == "htm"
    ) {
      term.openURL("https://youtu.be/dQw4w9WgXcQ?si=v6gpumClZDQc87zn");
    } else if (args[0].split(".")[1] == "htm") {
      term.openURL(`./${args[0]}`, false);
    } else if (args.join(" ") == "the pod bay doors") {
      term.stylePrint("HAL9000: I'm sorry anon, I'm afraid I can't do that...\n");
    } else {
      term.command(`cat ${args.join(" ")}`);
    }
  },

  more: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  emacs: function () {
    term.stylePrint("%emacs% not installed. try: %vi%");
  },

  vim: function () {
    term.stylePrint("%vim% not installed. try: %emacs%");
  },

  vi: function () {
    term.stylePrint("%vi% not installed. try: %emacs%");
  },

  pico: function () {
    term.stylePrint("%pico% not installed. try: %vi% or %emacs%");
  },

  nano: function () {
    term.stylePrint("%nano% not installed. try: %vi% or %emacs%");
  },

  pine: function () {
    term.openURL("mailto:hi3psilon@gmail.com");
  },

  curl: function (args) {
    term.stylePrint(
      `Access denied: ${args[0]} is off-limits. Try a real terminal.`
    );
  },

  ftp: function (args) {
    term.command(`curl ${args.join(" ")}`);
  },

  ssh: function (args) {
    term.command(`curl ${args.join(" ")}`);
  },

  sftp: function (args) {
    term.command(`curl ${args.join(" ")}`);
  },

  scp: function (args) {
    term.stylePrint(`Copy blocked: Can't steal ${args[0]} from the internet.`);
  },

  rm: function () {
    term.stylePrint("I'm sorry, can't do that. Files have feelings too.");
  },

  mkdir: function () {
    term.stylePrint("Nice try, but this place is already perfectly organized.");
  },

  alias: function () {
    term.stylePrint("Just call me Epsilon.");
  },

  df: function () {
    term.stylePrint("Disk full? Nah, I live in the cloud.");
  },

  kill: function (args) {
    if (args && args.slice(-1) == 337) {
      killed = true;
      term.stylePrint("Epsilon miner disabled. Crypto is safe... for now.");
    } else {
      term.stylePrint("You can't kill me. I run on caffeine.");
    }
  },

  killall: function (args) {
    term.command(`kill ${args.join(" ")}`);
  },

  locate: function () {
    term.stylePrint("Dimension C-137");
    term.stylePrint("42.42° N");
    term.stylePrint("69.69° W");
  },

  history: function () {
    term.history.forEach((element, index) => {
      term.stylePrint(`${1000 + index}  ${element}`);
    });
  },

  find: function (args) {
    const file = args[0];
    if (Object.keys(_FILES).includes(file)) {
      term.stylePrint(_FULL_PATHS[file]);
    } else {
      term.stylePrint(`%find%: ${file}: No such file or directory`);
    }
  },

  fdisk: function () {
    term.command("rm");
  },

  chown: function () {
    term.stylePrint("You do not have permission to %chown%");
  },

  chmod: function () {
    term.stylePrint("You do not have permission to %chmod%");
  },

  mv: function (args) {
    const src = args[0];

    if (_filesHere().includes(src)) {
      term.stylePrint(`You do not have permission to move file ${src}`);
    } else {
      term.stylePrint(`%mv%: ${src}: No such file or directory`);
    }
  },

  cp: function (args) {
    const src = args[0];

    if (_filesHere().includes(src)) {
      term.stylePrint(`You do not have permission to copy file ${src}`);
    } else {
      term.stylePrint(`%cp%: ${src}: No such file or directory`);
    }
  },

  touch: function () {
    term.stylePrint("You can't %touch% this");
  },

  sudo: function (args) {
    if (term.user == "epsilon") {
      term.command(args.join(" "));
    } else {
      term.stylePrint(
        `${colorText(
          term.user,
          "user"
        )} is not in the sudoers file. This incident will be reported`
      );
    }
  },

  su: function (args) {
    user = args[0] || "epsilon";

    if (user == "epsilon" || user == "guest") {
      term.user = user;
      term.command("cd ~");
    } else {
      term.stylePrint("su: Sorry");
    }
  },

  quit: function () {
    term.command("exit");
  },

  stop: function () {
    term.command("exit");
  },

  whoami: function () {
    term.stylePrint(term.user);
  },

  passwd: function () {
    term.stylePrint(
      "Wow. Maybe don't enter your password into a sketchy web-based term.command prompt?"
    );
  },

  ping: function () {
    term.stylePrint("pong");
  },

  ps: function () {
    term.stylePrint("PID TTY       TIME CMD");
    term.stylePrint("424 ttys00 0:00.33 %-zsh%");
    term.stylePrint("158 ttys01 0:09.70 %/bin/npm start%");
    term.stylePrint("767 ttys02 0:00.02 %/bin/sh%");
    if (!killed) {
      term.stylePrint("337 ttys03 0:13.37 %/bin/cgminer -o pwn.d%");
    }
  },

  uname: function (args) {
    switch (args[0]) {
      case "-a":
        term.stylePrint(
          "EpsilonPC epsilon 1.0.0 Epsilon Kernel Version 1.0.0 root:xnu-31415.926.5~3/RELEASE_X86_64 x86_64"
        );
        break;
      case "-mrs":
        term.stylePrint("EpsilonPC 1.0.0 x86_64");
        break;
      default:
        term.stylePrint("EpsilonPC");
    }
  },

  top: function () {
    term.command("ps");
  },

  exit: function () {
    term.stylePrint("Exiting terminal... launching GUI!");
    setTimeout(() => {
      window.open("https://3p5ilon.vercel.app/", "_blank");
    }, 1000);
  },

  clear: function () {
    term.init();
  },

  eval: function (args) {
    term.stylePrint(
      "please instead build a webstore with macros. in the meantime, the result is: " +
        eval(args.join(" "))
    );
  },

  bg: function (args) {
    term.stylePrint(
      `Job ${args} sent to background... hope it doesn’t crash your browser tabs.`
    );
  },

  apply: function () {
    term.stylePrint(
      "Applications closed — but you can always contribute to open-source!"
    );
  },
};

function _filesHere() {
  return _DIRS[term.cwd].filter(
    (e) => e != "README.md" || term.user == "epsilon"
  );
}
