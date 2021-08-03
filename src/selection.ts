import * as vscode from 'vscode';

const selectModeMap = new Map();

export function getEditorId(editor = vscode.window.activeTextEditor): string {
  return `${editor?.viewColumn || 0}${editor?.document.uri.toString()}`;
}

export function setSelectMode(value: boolean, editorId = getEditorId()): Map<string, boolean> {
  return selectModeMap.set(editorId, value);
}

export function isSelectMode(editorId = getEditorId()): boolean {
  if (!selectModeMap.has(editorId)) {
    setSelectMode(false, editorId);
  }

  return selectModeMap.get(editorId);
}
