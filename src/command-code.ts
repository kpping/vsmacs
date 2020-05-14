import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkModeState } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsEditorActionCommentLine = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionCommentLine',
        async (editor) => {
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
            await vscode.commands.executeCommand('editor.action.commentLine');
        },
    );
    context.subscriptions.push(vsmacsEditorActionCommentLine);

    const vsmacsEditorActionTriggerSuggest = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionTriggerSuggest',
        async (editor) => {
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
            await vscode.commands.executeCommand('editor.action.triggerSuggest');
        },
    );
    context.subscriptions.push(vsmacsEditorActionTriggerSuggest);

    const vsmacsEditorActionQuickFix = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionQuickFix',
        async (editor) => {
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
            await vscode.commands.executeCommand('editor.action.quickFix');
        },
    );
    context.subscriptions.push(vsmacsEditorActionQuickFix);
}
