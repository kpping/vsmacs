import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';
import { getState } from './state';
import { getActiveTextEitor, getCurrentPosistion, updateSelection } from './utils';

export function getCursorLineEndSelect(): vscode.Disposable {
    return vscode.commands.registerCommand('cursorLineEndSelect', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');
        await vscode.commands.executeCommand('cursorLineEnd');

        if (getState().isMarkMode) {
            editor.selection = updateSelection(getCurrentPosistion(editor));
        }
    });
}

export function getCursorLineStartSelect(): vscode.Disposable {
    return vscode.commands.registerCommand('cursorLineStartSelect', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');
        await vscode.commands.executeCommand('cursorLineStart');

        if (getState().isMarkMode) {
            editor.selection = updateSelection(editor.selection.active);
        }
    });
}

export function getEditorMoveList(): vscode.Disposable[] {
    const directionList = [
        'Bottom',
        'Down',
        'Left',
        'LineEnd',
        'LineStart',
        'Right',
        'Top',
        'Up',
        'WordEndRight',
        'WordStartLeft',
    ];

    return directionList.map((direction) =>
        vscode.commands.registerCommand(`vsmacs.move${direction}`, async () => {
            const editor = getActiveTextEitor();

            if (isNil(editor)) {
                return;
            }

            if (!getState().isMarkMode) {
                await vscode.commands.executeCommand(`cursor${direction}`);
                return;
            }

            // use in scenario: start mark mode, click some posistion, move
            if (!isNil(getState().markStart) && editor.selection.isEmpty) {
                editor.selection = updateSelection(editor.selection.active);
            }

            await vscode.commands.executeCommand(`cursor${direction}Select`);
        }),
    );
}

export function getNormalMoveList(): vscode.Disposable[] {
    const directionList = ['Down', 'End', 'Home', 'Left', 'Right', 'Up'];

    return directionList.map((direction) =>
        vscode.commands.registerCommand(`vsmacs.normal${direction}`, async () => {
            await vscode.commands.executeCommand('vsmacs.stopMarkMode');
            await vscode.commands.executeCommand(`cursor${direction}`);
        }),
    );
}

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(getCursorLineEndSelect());
    context.subscriptions.push(getCursorLineStartSelect());

    getEditorMoveList().forEach((move) => {
        context.subscriptions.push(move);
    });

    getNormalMoveList().forEach((move) => {
        context.subscriptions.push(move);
    });
}
