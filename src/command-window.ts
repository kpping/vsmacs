import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsWorkbenchActionSplitEditorRight = vscode.commands.registerCommand(
        'vsmacs.workbenchActionSplitEditorRight',
        async () => {
            await vscode.commands.executeCommand('workbench.action.splitEditorRight');
            await vscode.commands.executeCommand('workbench.action.openPreviousRecentlyUsedEditor');
        },
    );
    context.subscriptions.push(vsmacsWorkbenchActionSplitEditorRight);

    const vsmacsWorkbenchActionSplitEditorDown = vscode.commands.registerCommand(
        'vsmacs.workbenchActionSplitEditorDown',
        async () => {
            await vscode.commands.executeCommand('workbench.action.splitEditorDown');
            await vscode.commands.executeCommand('workbench.action.openPreviousRecentlyUsedEditor');
        },
    );
    context.subscriptions.push(vsmacsWorkbenchActionSplitEditorDown);
}
