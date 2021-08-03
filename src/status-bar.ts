import * as vscode from 'vscode';

const markSetStatusBar = vscode.window.createStatusBarItem();
markSetStatusBar.text = 'Mark set';

export function showMarkSetStatusBar() {
  markSetStatusBar.show();
}

export function hideMarkSetStatusBar() {
  markSetStatusBar.hide();
}

export function disposeMarkSetStatusBar() {
  markSetStatusBar.dispose();
}
