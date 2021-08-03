import * as path from 'path';
import * as fs from 'fs';

const PKG_JSON_PATH = path.join(__dirname, '../../package.json');

type CommandType = { key: string; command: string; when: string };

const pkg: {
  contributes: { keybindings: CommandType[] };
} = require(PKG_JSON_PATH);

function getCommandList(path: string): CommandType[] {
  return require(path);
}

function getCommandPath(str: string): string {
  return path.join(__dirname, `../../commands/command-${str}.json`);
}

pkg.contributes.keybindings = [
  'down',
  'jump',
  'left',
  'right',
  'up',
  'history',
  'search',
  'esc',
  'select',
  'text',
  'file',
  'window',
  'help',
]
  .map((str) => getCommandList(getCommandPath(str)))
  .reduce((prev, curr) => [...prev, ...curr], []);

fs.writeFileSync(PKG_JSON_PATH, JSON.stringify(pkg));
