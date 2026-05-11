import * as fs from 'node:fs';
import * as path from 'node:path';

const PKG_JSON_PATH = path.join(__dirname, '../../package.json');

type KeybindingEntry = { key?: string; command: string; when?: string };

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function getCommandPath(segment: string): string {
  return path.join(__dirname, `../../commands/command-${segment}.json`);
}

function main(): void {
  const pkg = readJson<{
    contributes: { keybindings: KeybindingEntry[] };
    [key: string]: unknown;
  }>(PKG_JSON_PATH);

  const segments = [
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
  ] as const;

  pkg.contributes.keybindings = segments.flatMap((segment) =>
    readJson<KeybindingEntry[]>(getCommandPath(segment)),
  );

  fs.writeFileSync(PKG_JSON_PATH, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
}

main();
