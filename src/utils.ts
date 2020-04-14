import * as vscode from 'vscode';
import { getState, updateState, IState } from './state';
import { isNil } from '@ag1/nil';

export function clonePosition({ line, character }: vscode.Position): vscode.Position {
    return new vscode.Position(line, character);
}

export function getCurrentPosistion(editor: vscode.TextEditor): vscode.Position {
    return editor.selection.active;
}

export function getActiveTextEitor(): vscode.TextEditor | undefined {
    return vscode.window.activeTextEditor;
}

export function setMarkMode(position: vscode.Position): IState {
    return updateState({
        isMarkMode: true,
        markStart: clonePosition(position),
        statusBarMsg: vscode.window.setStatusBarMessage('Mark set'),
    });
}

export function unsetMarkMode(): IState {
    const state = getState();

    if (!isNil(state.statusBarMsg)) {
        state.statusBarMsg.dispose();
    }

    return updateState({
        isMarkMode: false,
        markStart: undefined,
        statusBarMsg: undefined,
    });
}

export function updateSelection(lastPosition: vscode.Position): vscode.Selection {
    const { markStart } = getState();

    if (isNil(markStart)) {
        return new vscode.Selection(lastPosition, lastPosition);
    }

    return new vscode.Selection(markStart, lastPosition);
}
