import * as vscode from 'vscode';
import { updateState, IState } from './editor_state';
import { refreshUI } from './ui';

export function setMarkModeState(editor: vscode.TextEditor): IState {
    const state = updateState(editor, {
        isMarkMode: true,
        statusBarMessageStr: 'Mark Mode',
    });

    refreshUI(state);

    return state;
}

export function unsetMarkModeState(editor: vscode.TextEditor): IState {
    const state = updateState(editor, {
        isMarkMode: false,
        statusBarMessageStr: undefined,
    });

    refreshUI(state);

    return state;
}

// hidden api but widely use (it was created for vscode vim)
export function setContextIsMarkMode(context: vscode.ExtensionContext, isMarkMode: boolean) {
    return vscode.commands.executeCommand('setContext', 'isMarkMode', isMarkMode);
}
