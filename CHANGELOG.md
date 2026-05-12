## v0.13.0

- Keybindings: **scroll** — `alt+v` (page up), `ctrl+alt+v` (page down; on macOS the binding is `ctrl+v` so paste stays on Command+V).
- Keybindings: **jump** — `ctrl+l` (cursor to viewport center), `alt+g g` (go to line), `alt+g n` / `alt+g p` (next/previous problem in files), `alt+shift+,` / `alt+shift+.` (top/bottom of buffer, same commands as `ctrl+x shift+,` / `ctrl+x shift+.`).
- Keybindings: **window** — `ctrl+x 1` (maximize editor group), `ctrl+x left` / `ctrl+x right` (previous/next editor in group).
- Keybindings: **file** — `ctrl+x b` (show all editors).
- Select mode: page up/down and `alt+shift+,` / `alt+shift+.` variants wired for extending selection when mark mode is on.
- Generator: include `commands/command-scroll.json` in the merge order (`scroll` segment).

## v0.12.0

- Document development workflow in the README (Bun scripts, Biome, keybinding generator).
- Switch the project from npm to **Bun** (`packageManager`, `bun.lock`, scripts).
- Replace **ESLint** and **Prettier** with **Biome** for lint and format (`biome.json`, `bun run lint` / `bun run format`).
- Raise the VS Code engine to **^1.90** and use **`onStartupFinished`** instead of the deprecated `*` activation event.
- Tooling: TypeScript 5.7, stricter `tsconfig`, Node **>=20.19** in `engines`, Bun in `.tool-versions` for mise users.
- Extension code: register listeners on `context.subscriptions`, fix `getEditorId` when no editor is active, lazy status bar creation and disposal, initial select-mode context sync.
- Keybindings: add missing **`ctrl+g`** on `editor.debug.action.closeExceptionWidget` in `commands/command-esc.json`.
- Generator: read JSON without `require`, write formatted `package.json`, use `node:fs` / `node:path`.

## v0.11.0

- use event to start select mode if selection is not empty
- use event to stop select mode if selection is empty

## v0.10.0

- each editor has it own select mode
- use event to update select mode
- dispose event(s), object(s) in deactivate

## v0.9.0

- upgrade libs
- use chaining commands strategy
- refactoring
- remove some keybindings to improve overall stability

## v0.8.0

- add local `Mark Mode`
- fix bug incorrect behaviour of `ctrl+a` and `ctrl+e`

## v0.7.0

- use `setContext` to set `isMarkMode`.
- fix cursor moving bugs.
- refactoring

## v0.6.2

- make `home`, `ctrl+a`, `end` to be used as normal key on other input focus

## v0.6.1

- fix bug cannot move cursor by arrow keys when inputFocus

## v0.6.0

- update lscode api version, node version
- refacotring codes
- write script to include all keybindings into package.json for easier maintainance
- add `ctrl+c` (copy)
- change from `alt+{NUM}` to `ctrl+{NUM}` (openEditorAtIndex{NUM})
- fix bug `ctrl+y` not paste in windows os
- fix bug hint, suggestion, list, cannot select by default emacs move
- add `ctrl+x ctrl+w` (save as)
- add `ctrl+x k` (same as `ctrl+x ctrl+c`)

## v0.5.0

- Change `escape` to `alt` for `move to top` and `move to bottom` command (if more people use `escape` more than `alt`, i will add it back).

  _The reason behind this change is to avoid `key combination is not command`._

- Fix `escape` not cancel multi cursors

## v0.4.1

- Fix cannot `cmd+z (ctrl+z)` `cmd+shift+z (ctrl+y)` on search input

## v0.4.0

- Add `ctrl+x u`, `ctrl+shift+-` (undo)

## v0.3.0

- Add `ctrl+x s` (save all)
- Add `alt+g g` (go to line)
- Add `alt+g c` (go to char)
- Add `ctrl+x h` (select all)

## v0.2.2

- Fix cannot move up & down to select suggestion

## v0.2.1

- Fix cannot hit `escape` to close suggest widget

## v0.2.0

- Add `alt+d` (move forward one word)
- Add `alt+b` (move backward one word)
- Add `ctrl+r` (previous matching)
- Add `alt+d` (delete word after)

## v0.1.1

- Stop mark mode when hit backspace
- Fix mark mode not stop when pressing `ctrl+g` if selection is empty

## v0.1.0

- Upgrade libs version
- Refactoring code
- Fix (many) incorrect behaviours

## v0.0.5

- [Untracked changes, sorry]

## v0.0.4

- Fix bug cannot use `ctrl+n`, `ctrl+p`, `down`, `up` in widget

## v0.0.3

- Update change log

## v0.0.2

- Update read me, add repository to package.json

## v0.0.1

- First release
