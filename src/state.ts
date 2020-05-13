import * as vscode from 'vscode';

export interface IState {
    isMarkMode: boolean;
    markStart?: vscode.Position;
    statusBarMessage?: vscode.Disposable;
}

let state: IState = {
    isMarkMode: false,
};

export function getState(): IState {
    return {
        ...state,
    };
}

export function updateState(newState: Partial<IState>) {
    // side effect
    state = {
        ...getState(),
        ...newState,
    };

    return getState();
}
