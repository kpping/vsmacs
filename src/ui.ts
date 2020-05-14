import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';
import { IState as IEditorState } from './editor_state';
import { getState as getGlobalState, updateState as updateGlobalState } from './global_state';

export function setStatusBarMessage(message?: string | undefined): undefined | vscode.Disposable {
    // dispose (clear) statusBarMessage if available
    getGlobalState().statusBarMessage?.dispose();

    if (isNil(message)) {
        return undefined;
    }

    return vscode.window.setStatusBarMessage(message);
}

export function refreshUI(editorState: IEditorState): void {
    updateGlobalState({
        statusBarMessage: setStatusBarMessage(editorState.statusBarMessageStr),
    });
}
