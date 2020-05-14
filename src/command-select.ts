import * as vscode from 'vscode';
import { setContextIsMarkMode, setMarkModeState } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsEditorActionSelectAll = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionSelectAll',
        async (editor) => {
            await setContextIsMarkMode(context, setMarkModeState(editor).isMarkMode);
            await vscode.commands.executeCommand('editor.action.selectAll');
        },
    );
    context.subscriptions.push(vsmacsEditorActionSelectAll);
}
