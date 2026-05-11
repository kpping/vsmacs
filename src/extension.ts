import * as vscode from 'vscode';
import { getEditorId, isSelectMode, setSelectMode } from './selection';
import {
  createMarkSetStatusBar,
  disposeMarkSetStatusBar,
  hideMarkSetStatusBar,
  showMarkSetStatusBar,
} from './status-bar';

export function activate(context: vscode.ExtensionContext): void {
  createMarkSetStatusBar();

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.utils.commands', async (args: string[]) => {
      for (const command of args) {
        await vscode.commands.executeCommand(command);
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.update', async () => {
      await vscode.commands.executeCommand('setContext', 'vsmacs.selectMode.value', isSelectMode());

      if (isSelectMode() === false) {
        await vscode.commands.executeCommand('cancelSelection');
        hideMarkSetStatusBar();
      } else {
        showMarkSetStatusBar();
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.start', async () => {
      setSelectMode(true);
      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.stop', async () => {
      setSelectMode(false);
      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    }),
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      void vscode.commands.executeCommand('vsmacs.selectMode.update');
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(() => {
      if (isSelectMode()) {
        void vscode.commands.executeCommand('vsmacs.selectMode.stop');
      }
    }),
  );

  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((e) => {
      if (!e.textEditor.selection.isEmpty && !isSelectMode(getEditorId(e.textEditor))) {
        void vscode.commands.executeCommand('vsmacs.selectMode.start');
      } else if (e.textEditor.selection.isEmpty && isSelectMode(getEditorId(e.textEditor))) {
        void vscode.commands.executeCommand('vsmacs.selectMode.stop');
      }
    }),
  );

  context.subscriptions.push(new vscode.Disposable(() => disposeMarkSetStatusBar()));

  void vscode.commands.executeCommand('vsmacs.selectMode.update');
}

export function deactivate(): void {
  disposeMarkSetStatusBar();
}
