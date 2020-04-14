import * as vscode from 'vscode';

export interface IState {
    isMarkMode?: boolean;
    markStart?: vscode.Position;
    statusBarMsg?: vscode.Disposable;
}

let state: IState = {
    isMarkMode: false,
};

export function getState(): IState {
    return {
        ...state,
    };
}

export function updateState(newState: IState) {
    state = {
        ...state,
        ...newState,
    };

    return getState();
}
