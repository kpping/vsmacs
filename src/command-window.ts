import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
    // split editor right
    const splitEditorRight = vscode.commands.registerCommand('vsmacs.splitEditorRight', async () => {
        await vscode.commands.executeCommand('workbench.action.splitEditorRight');
        await vscode.commands.executeCommand('workbench.action.openPreviousRecentlyUsedEditor');
    });
    context.subscriptions.push(splitEditorRight);

    // split editor down
    const splitEditorDown = vscode.commands.registerCommand('vsmacs.splitEditorDown', async () => {
        await vscode.commands.executeCommand('workbench.action.splitEditorDown');
        await vscode.commands.executeCommand('workbench.action.openPreviousRecentlyUsedEditor');
    });
    context.subscriptions.push(splitEditorDown);
}
