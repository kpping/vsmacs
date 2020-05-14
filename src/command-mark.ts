import * as vscode from 'vscode';
import { setContextIsMarkMode, setMarkModeState } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsSetMarkMode = vscode.commands.registerTextEditorCommand('vsmacs.setMarkMode', async (editor) => {
        await vscode.commands.executeCommand('cancelSelection');
        await setContextIsMarkMode(context, setMarkModeState(editor).isMarkMode);
    });
    context.subscriptions.push(vsmacsSetMarkMode);
}
