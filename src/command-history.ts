import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkMode } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsUndo = vscode.commands.registerCommand('vsmacs.undo', async () => {
        await setContextIsMarkMode(context, unsetMarkMode());
        await vscode.commands.executeCommand('undo');
    });
    context.subscriptions.push(vsmacsUndo);

    const vsmacsRedo = vscode.commands.registerCommand('vsmacs.redo', async () => {
        await setContextIsMarkMode(context, unsetMarkMode());
        await vscode.commands.executeCommand('redo');
    });
    context.subscriptions.push(vsmacsRedo);
}
