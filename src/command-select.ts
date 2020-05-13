import * as vscode from 'vscode';
import { setContextIsMarkMode, setMarkMode } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsEditorActionSelectAll = vscode.commands.registerCommand('vsmacs.editorActionSelectAll', async () => {
        await setContextIsMarkMode(context, setMarkMode());
        await vscode.commands.executeCommand('editor.action.selectAll');
    });
    context.subscriptions.push(vsmacsEditorActionSelectAll);
}
