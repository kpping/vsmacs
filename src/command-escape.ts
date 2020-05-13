import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkMode } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsCancelSelection = vscode.commands.registerCommand('vsmacs.cancelSelection', async () => {
        await vscode.commands.executeCommand('cancelSelection');
        await setContextIsMarkMode(context, unsetMarkMode());
    });
    context.subscriptions.push(vsmacsCancelSelection);
}
