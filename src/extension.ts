import * as vscode from 'vscode';
import { setSelectMode, isSelectMode } from './selection';
import { showMarkSetStatusBar, hideMarkSetStatusBar, disposeMarkSetStatusBar } from './status-bar';

const diposableList: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.utils.commands', async (args: string[]) => {
      for (const command of args) {
        await vscode.commands.executeCommand(command);
      }
    })
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
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.start', async () => {
      // switch mode
      setSelectMode(true);

      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.stop', async () => {
      // switch mode
      setSelectMode(false);

      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    })
  );

  diposableList.push(
    vscode.window.onDidChangeActiveTextEditor(async () => {
      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    })
  );

  diposableList.push(
    vscode.workspace.onDidChangeTextDocument(async () => {
      if (isSelectMode()) {
        await vscode.commands.executeCommand('vsmacs.selectMode.stop');
      }
    })
  );
}

export function deactivate() {
  diposableList.forEach((d) => d.dispose());

  disposeMarkSetStatusBar();
}
