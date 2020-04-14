import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
    // closeFindWidget + vsmacs.stopMarkMode
    const closeFindWidget = vscode.commands.registerCommand('vsmacs.closeFindWidget', async () => {
        await vscode.commands.executeCommand('closeFindWidget');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
    context.subscriptions.push(closeFindWidget);
}
