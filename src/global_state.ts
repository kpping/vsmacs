import * as vscode from 'vscode';

export interface IState {
    statusBarMessage?: vscode.Disposable;
}

let state: IState = {};

export function getState(): IState {
    return { ...state };
}

export function updateState(newState: Partial<IState>) {
    // side effect
    state = {
        ...getState(),
        ...newState,
    };

    return getState();
}
