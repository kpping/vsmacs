import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkMode } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsEditorActionCommentLine = vscode.commands.registerCommand(
        'vsmacs.editorActionCommentLine',
        async () => {
            await setContextIsMarkMode(context, unsetMarkMode());
            await vscode.commands.executeCommand('editor.action.commentLine');
        },
    );
    context.subscriptions.push(vsmacsEditorActionCommentLine);

    const vsmacsEditorActionTriggerSuggest = vscode.commands.registerCommand(
        'vsmacs.editorActionTriggerSuggest',
        async () => {
            await setContextIsMarkMode(context, unsetMarkMode());
            await vscode.commands.executeCommand('editor.action.triggerSuggest');
        },
    );
    context.subscriptions.push(vsmacsEditorActionTriggerSuggest);

    const vsmacsEditorActionQuickFix = vscode.commands.registerCommand('vsmacs.editorActionQuickFix', async () => {
        await setContextIsMarkMode(context, unsetMarkMode());
        await vscode.commands.executeCommand('editor.action.quickFix');
    });
    context.subscriptions.push(vsmacsEditorActionQuickFix);
}
