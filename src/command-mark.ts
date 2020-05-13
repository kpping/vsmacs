import * as vscode from 'vscode';
import { setContextIsMarkMode, setMarkMode } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsSetMarkMode = vscode.commands.registerCommand('vsmacs.setMarkMode', async () => {
        await vscode.commands.executeCommand('cancelSelection');
        await setContextIsMarkMode(context, setMarkMode());
    });
    context.subscriptions.push(vsmacsSetMarkMode);
}
