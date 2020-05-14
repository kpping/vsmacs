import * as vscode from 'vscode';
import { setContextIsMarkMode, unsetMarkModeState } from './utils';

export function activate(context: vscode.ExtensionContext): void {
    const vsmacsDeleteLeft = vscode.commands.registerTextEditorCommand('vsmacs.deleteLeft', async (editor) => {
        await vscode.commands.executeCommand('deleteLeft');
        await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
    });
    context.subscriptions.push(vsmacsDeleteLeft);

    const vsmacsDeleteRight = vscode.commands.registerTextEditorCommand('vsmacs.deleteRight', async (editor) => {
        await vscode.commands.executeCommand('deleteRight');
        await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
    });
    context.subscriptions.push(vsmacsDeleteRight);

    const vsmacsEditorActionClipboardCutAction = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionClipboardCutAction',
        async (editor) => {
            await vscode.commands.executeCommand('editor.action.clipboardCutAction');
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        },
    );
    context.subscriptions.push(vsmacsEditorActionClipboardCutAction);

    const vsmacsEditorActionClipboardCopyAction = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionClipboardCopyAction',
        async (editor) => {
            await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
            await vscode.commands.executeCommand('cancelSelection');
        },
    );
    context.subscriptions.push(vsmacsEditorActionClipboardCopyAction);

    const vsmacsEditorActionClipboardPasteAction = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionClipboardPasteAction',
        async (editor) => {
            await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        },
    );
    context.subscriptions.push(vsmacsEditorActionClipboardPasteAction);

    const vsmacsCutAllRight = vscode.commands.registerTextEditorCommand('vsmacs.cutAllRight', async (editor) => {
        await vscode.commands.executeCommand('cursorEndSelect');
        await vscode.commands.executeCommand('editor.action.clipboardCutAction');
        await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
    });
    context.subscriptions.push(vsmacsCutAllRight);

    const vsmacsEditorActionInsertLineAfter = vscode.commands.registerTextEditorCommand(
        'vsmacs.editorActionInsertLineAfter',
        async (editor) => {
            await vscode.commands.executeCommand('editor.action.insertLineAfter');
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        },
    );
    context.subscriptions.push(vsmacsEditorActionInsertLineAfter);

    const vsmacsDeleteWordLeft = vscode.commands.registerTextEditorCommand('vsmacs.deleteWordLeft', async (editor) => {
        await vscode.commands.executeCommand('deleteWordLeft');
        await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
    });
    context.subscriptions.push(vsmacsDeleteWordLeft);

    const vsmacsDeleteWordRight = vscode.commands.registerTextEditorCommand(
        'vsmacs.deleteWordRight',
        async (editor) => {
            await vscode.commands.executeCommand('deleteWordRight');
            await setContextIsMarkMode(context, unsetMarkModeState(editor).isMarkMode);
        },
    );
    context.subscriptions.push(vsmacsDeleteWordRight);
}
