import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkModeState } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsCancelSelection = vscode.commands.registerTextEditorCommand(
        'vsmacs.cancelSelection',
        async (editor) => {
            await vscode.commands.executeCommand('cancelSelection');
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        },
    );
    context.subscriptions.push(vsmacsCancelSelection);
}
