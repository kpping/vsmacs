import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';

export interface IState {
    isMarkMode: boolean;
    statusBarMessageStr?: string;
}

const stateStore: { [key: string]: IState } = {};

export function createState(state: Partial<IState> = {}): IState {
    return {
        isMarkMode: false,
        ...state,
    };
}

export function getEditorId(editor: vscode.TextEditor): string {
    return editor.document.uri.toString();
}

export function getState(editor: vscode.TextEditor): IState {
    const uriStr = getEditorId(editor);

    if (isNil(stateStore[uriStr])) {
        stateStore[uriStr] = createState();
    }

    return { ...stateStore[uriStr] };
}

export function updateState(editor: vscode.TextEditor, newState: Partial<IState>) {
    const uriStr = getEditorId(editor);

    // side effect
    stateStore[uriStr] = {
        ...getState(editor),
        ...newState,
    };

    return getState(editor);
}
