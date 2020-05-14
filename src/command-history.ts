import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkModeState } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsUndo = vscode.commands.registerTextEditorCommand('vsmacs.undo', async (editor) => {
        await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        await vscode.commands.executeCommand('undo');
    });
    context.subscriptions.push(vsmacsUndo);

    const vsmacsRedo = vscode.commands.registerTextEditorCommand('vsmacs.redo', async (editor) => {
        await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        await vscode.commands.executeCommand('redo');
    });
    context.subscriptions.push(vsmacsRedo);
}
