import * as vscode from 'vscode';

const selectModeMap = new Map();

export function getActiveEditorId(editor = vscode.window.activeTextEditor): string {
  return `${editor?.viewColumn || 0}${editor?.document.uri.toString()}`;
}

export function setSelectMode(
  value: boolean,
  editorId = getActiveEditorId()
): Map<string, boolean> {
  return selectModeMap.set(editorId, value);
}

export function isSelectMode(editorId = getActiveEditorId()): boolean {
  if (!selectModeMap.has(editorId)) {
    setSelectMode(false, editorId);
  }

  return selectModeMap.get(editorId);
}
