# VSmacs

Emacs-style key bindings for Visual Studio Code. No kill ring, no extra chrome. The goal is to keep over-engineering to a minimum.

## Requirements

- [Visual Studio Code](https://code.visualstudio.com/) **1.90** or newer (see `engines.vscode` in `package.json`).

## Features

### Basic move

| Keys               | Action                        |
| ------------------ | ----------------------------- |
| `ctrl+a`           | Move to beginning of the line |
| `ctrl+e`           | Move to end of the line       |
| `ctrl+f`           | Move forward                  |
| `alt+f`            | Move forward one word         |
| `ctrl+b`           | Move backward                 |
| `alt+b`            | Move backward one word        |
| `ctrl+n`           | Move down (next line)         |
| `ctrl+p`           | Move up (previous line)       |
| `ctrl+x shift+,`   | Move to top of buffer         |
| `ctrl+x shift+.`   | Move to bottom of buffer      |
| `alt+shift+,`      | Move to top of buffer         |
| `alt+shift+.`      | Move to bottom of buffer      |
| `ctrl+l`           | Move cursor to center of viewport |

### Scroll

| Keys           | Action                              |
| -------------- | ----------------------------------- |
| `alt+v`        | Page up                             |
| `ctrl+alt+v`   | Page down (on macOS, `ctrl+v`)      |

### Jump and problems

| Keys      | Action                          |
| --------- | ------------------------------- |
| `alt+g g` | Go to line                      |
| `alt+g n` | Next problem in files           |
| `alt+g p` | Previous problem in files       |

### Search

| Keys     | Action                         |
| -------- | ------------------------------ |
| `ctrl+s` | Open search, next match        |
| `ctrl+r` | Open search, previous match    |

### Cancel, close widget

| Keys     | Action        |
| -------- | ------------- |
| `ctrl+g` | Cancel, close |

### Screen and editor

| Keys              | Action                         |
| ----------------- | ------------------------------ |
| `ctrl+x ctrl+c`   | Close active editor            |
| `ctrl+x 0`        | Close active editor            |
| `ctrl+x 1`        | Maximize editor group          |
| `ctrl+x 2`        | Split editor horizontally      |
| `ctrl+x 3`        | Split editor vertically        |
| `ctrl+x o`        | Focus next editor group        |
| `ctrl+x left`     | Previous editor in group       |
| `ctrl+x right`    | Next editor in group           |

### File

| Keys            | Action                    |
| --------------- | ------------------------- |
| `ctrl+x ctrl+s` | Save                      |
| `ctrl+x s`      | Save all                  |
| `ctrl+x ctrl+w` | Save as                   |
| `ctrl+x ctrl+f` | Quick open                |
| `ctrl+x ctrl+b` | Open recently used editor |
| `ctrl+x b`      | Show all editors          |

### Editing

| Keys                            | Action                          |
| ------------------------------- | ------------------------------- |
| `ctrl+/`, `ctrl+x u`, `ctrl+_`  | Undo                            |
| `ctrl+.`                        | Redo                            |
| `ctrl+'`, `ctrl+x space`        | Trigger suggest (autocomplete)  |
| `ctrl+;`, `ctrl+x .`            | Quick fix                       |
| `ctrl+space`                    | Toggle mark mode                |
| `alt+w`                         | Copy to clipboard               |
| `ctrl+w`                        | Cut to clipboard                |
| `ctrl+y`                        | Paste from clipboard            |
| `ctrl+k`                        | Kill line (cut)                 |
| `ctrl+j`, `ctrl+m`, `ctrl+o`    | Insert line after               |
| `ctrl+d`                        | Delete after                    |
| `alt+d`                         | Delete word after               |
| `ctrl+x h`                      | Select all                      |
| `alt+/`, `ctrl+x /`             | Toggle line comment             |

### Other

| Keys    | Action              |
| ------- | ------------------- |
| `alt+x` | Command palette   |

## Development

This repo uses [Bun](https://bun.sh/) for installs and scripts (`packageManager` in `package.json`). For local Node/Bun versions, [mise](https://mise.jdx.dev/) reads `.tool-versions`.

| Command            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `bun install`      | Install dependencies (including the TypeScript compiler). |
| `bun run compile`  | Emit JavaScript to `out/` (used by the published extension). |
| `bun run watch`    | Same as compile in watch mode (default VS Code build task). |
| `bun run generate` | Compile, then merge `commands/command-*.json` (including `command-scroll.json`) into `package.json` `contributes.keybindings`. Run this after editing those JSON files. |
| `bun run lint`     | [Biome](https://biomejs.dev/) check (lint + format check). |
| `bun run format`   | Biome check with `--write` (format and safe fixes).        |

Linting and formatting are handled by **Biome** only (no ESLint or Prettier). The workspace recommends the [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome).

To try the extension in a VS Code window: open this folder, run **Run Extension** from the Run and Debug view (see `.vscode/launch.json`).

## License

MIT. See `package.json` for links, repository, and publisher metadata.
