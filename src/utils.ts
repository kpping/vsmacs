import * as vscode from 'vscode';
import { getState, updateState } from './state';

// dispose (clear) statusBarMessage if available
export function disposeStatusBarMessage(): undefined {
    getState().statusBarMessage?.dispose();

    return undefined;
}

export function setMarkMode(): boolean {
    return updateState({
        isMarkMode: true,
        statusBarMessage: disposeStatusBarMessage() || vscode.window.setStatusBarMessage('Mark set'),
    }).isMarkMode;
}

export function unsetMarkMode(): boolean {
    return updateState({
        isMarkMode: false,
        statusBarMessage: disposeStatusBarMessage(),
    }).isMarkMode;
}

// hidden api but widely use (it was created for vscode vim)
export function setContextIsMarkMode(context: vscode.ExtensionContext, isMarkMode: boolean) {
    return vscode.commands.executeCommand('setContext', 'isMarkMode', isMarkMode);
}
