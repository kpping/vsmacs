import * as vscode from 'vscode';

let markSetStatusBar: vscode.StatusBarItem | undefined;

export function createMarkSetStatusBar(): void {
  if (markSetStatusBar) {
    return;
  }
  markSetStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  markSetStatusBar.text = 'Mark set';
}

export function showMarkSetStatusBar(): void {
  markSetStatusBar?.show();
}

export function hideMarkSetStatusBar(): void {
  markSetStatusBar?.hide();
}

export function disposeMarkSetStatusBar(): void {
  markSetStatusBar?.dispose();
  markSetStatusBar = undefined;
}
