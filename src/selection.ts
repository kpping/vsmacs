import * as vscode from 'vscode';

const selectModeMap = new Map<string, boolean>();

export function getEditorId(
  editor: vscode.TextEditor | undefined = vscode.window.activeTextEditor,
): string {
  const uri = editor?.document.uri.toString() ?? '';
  const column = editor?.viewColumn ?? 0;
  return `${column}:${uri}`;
}

export function setSelectMode(value: boolean, editorId = getEditorId()): void {
  selectModeMap.set(editorId, value);
}

export function isSelectMode(editorId = getEditorId()): boolean {
  if (!selectModeMap.has(editorId)) {
    selectModeMap.set(editorId, false);
  }

  return selectModeMap.get(editorId) ?? false;
}
