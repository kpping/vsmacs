import * as vscode from 'vscode';

let isSelectMode = false;

const markSetStatusBar = vscode.window.createStatusBarItem();
markSetStatusBar.text = 'Mark set';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'vsmacs.utils.commands',
      async (args: string[]) => {
        for (const command of args) {
          await vscode.commands.executeCommand(command);
        }
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.update', async () => {
      await vscode.commands.executeCommand(
        'setContext',
        'vsmacs.selectMode.value',
        isSelectMode
      );

      if (isSelectMode === false) {
        await vscode.commands.executeCommand('cancelSelection');
        markSetStatusBar.hide();
      } else {
        markSetStatusBar.show();
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.start', async () => {
      // switch mode
      isSelectMode = true;

      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vsmacs.selectMode.stop', async () => {
      // switch mode
      isSelectMode = false;

      await vscode.commands.executeCommand('vsmacs.selectMode.update');
    })
  );
}

export function deactivate() {}
