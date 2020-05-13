import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkMode } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsDeleteLeft = vscode.commands.registerCommand('vsmacs.deleteLeft', async () => {
        await vscode.commands.executeCommand('deleteLeft');
        await setContextIsMarkMode(context, unsetMarkMode());
    });
    context.subscriptions.push(vsmacsDeleteLeft);

    const vsmacsDeleteRight = vscode.commands.registerCommand('vsmacs.deleteRight', async () => {
        await vscode.commands.executeCommand('deleteRight');
        await setContextIsMarkMode(context, unsetMarkMode());
    });
    context.subscriptions.push(vsmacsDeleteRight);

    const vsmacsEditorActionClipboardCutAction = vscode.commands.registerCommand(
        'vsmacs.editorActionClipboardCutAction',
        async () => {
            await vscode.commands.executeCommand('editor.action.clipboardCutAction');
            await setContextIsMarkMode(context, unsetMarkMode());
        },
    );
    context.subscriptions.push(vsmacsEditorActionClipboardCutAction);

    const vsmacsEditorActionClipboardCopyAction = vscode.commands.registerCommand(
        'vsmacs.editorActionClipboardCopyAction',
        async () => {
            await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
            await setContextIsMarkMode(context, unsetMarkMode());
        },
    );
    context.subscriptions.push(vsmacsEditorActionClipboardCopyAction);

    const vsmacsEditorActionClipboardPasteAction = vscode.commands.registerCommand(
        'vsmacs.editorActionClipboardPasteAction',
        async () => {
            await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
            await setContextIsMarkMode(context, unsetMarkMode());
        },
    );
    context.subscriptions.push(vsmacsEditorActionClipboardPasteAction);

    const vsmacsCutAllRight = vscode.commands.registerCommand('vsmacs.cutAllRight', async () => {
        await vscode.commands.executeCommand('cursorEndSelect');
        await vscode.commands.executeCommand('editor.action.clipboardCutAction');
        await setContextIsMarkMode(context, unsetMarkMode());
    });
    context.subscriptions.push(vsmacsCutAllRight);

    const vsmacsEditorActionInsertLineAfter = vscode.commands.registerCommand(
        'vsmacs.editorActionInsertLineAfter',
        async () => {
            await vscode.commands.executeCommand('editor.action.insertLineAfter');
            await setContextIsMarkMode(context, unsetMarkMode());
        },
    );
    context.subscriptions.push(vsmacsEditorActionInsertLineAfter);

    const vsmacsDeleteWordLeft = vscode.commands.registerCommand('vsmacs.deleteWordLeft', async () => {
        await vscode.commands.executeCommand('deleteWordLeft');
        await setContextIsMarkMode(context, unsetMarkMode());
    });
    context.subscriptions.push(vsmacsDeleteWordLeft);

    const vsmacsDeleteWordRight = vscode.commands.registerCommand('vsmacs.deleteWordRight', async () => {
        await vscode.commands.executeCommand('deleteWordRight');
        await setContextIsMarkMode(context, unsetMarkMode());
    });
    context.subscriptions.push(vsmacsDeleteWordRight);
}
