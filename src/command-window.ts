import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';
import { setContextIsMarkMode, unsetMarkModeState, setMarkModeState } from './utils';
import { getState } from './editor_state';

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

    const activeEditorChangeHandler = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        if (isNil(editor)) {
            return;
        }

        await setContextIsMarkMode(
            context,
            (getState(editor).isMarkMode ? setMarkModeState(editor) : unsetMarkModeState(editor)).isMarkMode,
        );
    });
    context.subscriptions.push(activeEditorChangeHandler);
}
