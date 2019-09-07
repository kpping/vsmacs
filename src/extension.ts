import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';

let isMarkMode = false;
let markStart: vscode.Position | undefined = undefined;
let statusBarMsg!: vscode.Disposable;

export function clonePosition({ line, character }: vscode.Position): vscode.Position {
    return new vscode.Position(line, character);
}

export function setMarkMode(position: vscode.Position): void {
    isMarkMode = true;
    markStart = clonePosition(position);
    statusBarMsg = vscode.window.setStatusBarMessage('Mark set');
}

export function unsetMarkMode(): void {
    isMarkMode = false;
    markStart = undefined;

    if (!isNil(statusBarMsg)) {
        statusBarMsg.dispose();
    }
}

export function updateSelection(lastPosition: vscode.Position): vscode.Selection {
    if (isNil(markStart)) {
        return new vscode.Selection(lastPosition, lastPosition);
    }

    return new vscode.Selection(markStart, lastPosition);
}

export function getCurrentPosistion(editor: vscode.TextEditor): vscode.Position {
    return editor.selection.active;
}

export function getActiveTextEitor(): vscode.TextEditor | undefined {
    return vscode.window.activeTextEditor;
}

export function activate(context: vscode.ExtensionContext): void {
    // cancelSelection + unset mark mode
    const stopMarkMode = vscode.commands.registerCommand('vsmacs.stopMarkMode', async () => {
        await vscode.commands.executeCommand('cancelSelection');
        unsetMarkMode();
    });
    context.subscriptions.push(stopMarkMode);

    // closeFindWidget + vsmacs.stopMarkMode
    const closeFindWidget = vscode.commands.registerCommand('vsmacs.closeFindWidget', async () => {
        await vscode.commands.executeCommand('closeFindWidget');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
    context.subscriptions.push(closeFindWidget);

    // lineBreakInsert + cursorDown + cursorLineStart
    const lineBreakInsert = vscode.commands.registerCommand('vsmacs.lineBreakInsert', async () => {
        await vscode.commands.executeCommand('lineBreakInsert');
        await vscode.commands.executeCommand('cursorDown');
        await vscode.commands.executeCommand('cursorLineStart');
    });
    context.subscriptions.push(lineBreakInsert);

    // editor.action.clipboardCopyAction + vsmacs.stopMarkMode
    const clipboardCopyAction = vscode.commands.registerCommand('vsmacs.clipboardCopyAction', async () => {
        await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
    context.subscriptions.push(clipboardCopyAction);

    // editor.action.clipboardCutAction + cancelSelection
    const clipboardCutAction = vscode.commands.registerCommand('vsmacs.clipboardCutAction', async () => {
        await vscode.commands.executeCommand('editor.action.clipboardCutAction');
        unsetMarkMode();
    });
    context.subscriptions.push(clipboardCutAction);

    // editor.action.clipboardPasteAction + cancelSelection
    const clipboardPasteAction = vscode.commands.registerCommand('vsmacs.clipboardPasteAction', async () => {
        await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
        unsetMarkMode();
    });
    context.subscriptions.push(clipboardPasteAction);

    // cancelSelection + toggle mark mode
    const toggleMarkMode = vscode.commands.registerCommand('vsmacs.toggleMarkMode', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');

        if (isMarkMode) {
            unsetMarkMode();
        } else {
            setMarkMode(getCurrentPosistion(editor));
        }
    });
    context.subscriptions.push(toggleMarkMode);

    // cursorLineEndSelect
    const cursorLineEndSelect = vscode.commands.registerCommand('cursorLineEndSelect', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');
        await vscode.commands.executeCommand('cursorLineEnd');

        if (isMarkMode) {
            editor.selection = updateSelection(getCurrentPosistion(editor));
        }
    });
    context.subscriptions.push(cursorLineEndSelect);

    // cursorLineStartSelect
    const cursorLineStartSelect = vscode.commands.registerCommand('cursorLineStartSelect', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');
        await vscode.commands.executeCommand('cursorLineStart');

        if (isMarkMode) {
            editor.selection = updateSelection(editor.selection.active);
        }
    });
    context.subscriptions.push(cursorLineStartSelect);

    // move[Right, Left, Down, Up, Bottom, Top, LineEnd, LineStart, WordEndRight, WordStartLeft]
    const moveList = [
        'Right',
        'Left',
        'Down',
        'Up',
        'Bottom',
        'Top',
        'LineEnd',
        'LineStart',
        'WordEndRight',
        'WordStartLeft',
    ];
    moveList.forEach((direction) => {
        const move = vscode.commands.registerCommand(`vsmacs.move${direction}`, async () => {
            const editor = getActiveTextEitor();

            if (isNil(editor)) {
                return;
            }

            if (!isMarkMode) {
                await vscode.commands.executeCommand(`cursor${direction}`);
                return;
            }

            // use in scenario: start mark mode, click some posistion, move
            if (!isNil(markStart) && editor.selection.isEmpty) {
                editor.selection = updateSelection(editor.selection.active);
            }

            await vscode.commands.executeCommand(`cursor${direction}Select`);
        });
        context.subscriptions.push(move);
    });

    // normal[Right, Left, Down, Up, End, Home]
    const normalList = ['Right', 'Left', 'Down', 'Up', 'End', 'Home'];
    normalList.forEach((direction) => {
        const move = vscode.commands.registerCommand(`vsmacs.normal${direction}`, async () => {
            await vscode.commands.executeCommand('vsmacs.stopMarkMode');
            await vscode.commands.executeCommand(`cursor${direction}`);
        });
        context.subscriptions.push(move);
    });

    // deleteLeft
    const deleteLeft = vscode.commands.registerCommand('vsmacs.deleteLeft', async () => {
        await vscode.commands.executeCommand('deleteLeft');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
    context.subscriptions.push(deleteLeft);

    // deleteRight
    const deleteRight = vscode.commands.registerCommand('vsmacs.deleteRight', async () => {
        await vscode.commands.executeCommand('deleteRight');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
    context.subscriptions.push(deleteRight);

    // deleteWordRight
    const deleteWordRight = vscode.commands.registerCommand('vsmacs.deleteWordRight', async () => {
        await vscode.commands.executeCommand('deleteWordRight');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
    context.subscriptions.push(deleteWordRight);

    // killing
    const killing = vscode.commands.registerCommand('vsmacs.killing', async () => {
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
        await vscode.commands.executeCommand('vsmacs.toggleMarkMode');
        await vscode.commands.executeCommand('vsmacs.moveLineEnd');
        await vscode.commands.executeCommand('vsmacs.clipboardCutAction');
    });
    context.subscriptions.push(killing);
}
