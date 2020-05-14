import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';
import { setContextIsMarkMode, unsetMarkModeState, setMarkModeState } from './utils';
import { getState } from './editor_state';

export function activate(context: vscode.ExtensionContext): void {
    const activeEditorChangeHandler = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        if (isNil(editor)) {
            return;
        }

        await setContextIsMarkMode(
            context,
            (getState(editor).isMarkMode ? setMarkModeState(editor) : unsetMarkModeState(editor)).isMarkMode,
        );
    });
    context.subscriptions.push(activeEditorChangeHandler);
}
