import * as vscode from 'vscode';
import { isNil } from '@ag1/nil';

let isMarkSet = false;
let markStart: vscode.Position | undefined = undefined;
let statusBarMsg!: vscode.Disposable;

export function clonePosition({ line, character }: vscode.Position): vscode.Position {
    return new vscode.Position(line, character);
}

export function markSet(position: vscode.Position) {
    isMarkSet = true;
    markStart = clonePosition(position);
    statusBarMsg = vscode.window.setStatusBarMessage('Mark set');
}

export function markUnset() {
    isMarkSet = false;
    markStart = undefined;

    if (!isNil(statusBarMsg)) {
        statusBarMsg.dispose();
    }
}

export function getSelection(lastPosition: vscode.Position) {
    if (isNil(markStart)) {
        return new vscode.Selection(lastPosition, lastPosition);
    }

    return new vscode.Selection(markStart, lastPosition);
}

export function activate(context: vscode.ExtensionContext): void {
    // stop mark set + cancelSelection
    const stopMarkSetCancelSelection = vscode.commands.registerCommand(
        'vsmacs.stopMarkSetCancelSelection',
        async () => {
            await vscode.commands.executeCommand('cancelSelection');
            markUnset();
        },
    );
    context.subscriptions.push(stopMarkSetCancelSelection);

    // closeFindWidget + cancelSelection
    const closeFindWidgetCancelSelection = vscode.commands.registerCommand(
        'vsmacs.closeFindWidgetCancelSelection',
        async () => {
            await vscode.commands.executeCommand('closeFindWidget');
            await vscode.commands.executeCommand('vsmacs.stopMarkSetCancelSelection');
        },
    );
    context.subscriptions.push(closeFindWidgetCancelSelection);

    // lineBreakInsert + cursorDown + cursorLineStart
    const lineBreakInsertCursorDownCursorLineStart = vscode.commands.registerCommand(
        'vsmacs.lineBreakInsertCursorDownCursorLineStart',
        async () => {
            await vscode.commands.executeCommand('lineBreakInsert');
            await vscode.commands.executeCommand('cursorDown');
            await vscode.commands.executeCommand('cursorLineStart');
        },
    );
    context.subscriptions.push(lineBreakInsertCursorDownCursorLineStart);

    // editor.action.clipboardCopyAction + cancelSelection
    const clipboardCopyActionCancelSelection = vscode.commands.registerCommand(
        'vsmacs.clipboardCopyActionCancelSelection',
        async () => {
            await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
            await vscode.commands.executeCommand('vsmacs.stopMarkSetCancelSelection');
        },
    );
    context.subscriptions.push(clipboardCopyActionCancelSelection);

    // editor.action.clipboardCutAction + cancelSelection
    const clipboardCutActionCancelSelection = vscode.commands.registerCommand(
        'vsmacs.clipboardCutActionCancelSelection',
        async () => {
            await vscode.commands.executeCommand('editor.action.clipboardCutAction');
            markUnset();
        },
    );
    context.subscriptions.push(clipboardCutActionCancelSelection);

    // editor.action.clipboardPasteActionCancelSelection + cancelSelection
    const clipboardPasteActionCancelSelection = vscode.commands.registerCommand(
        'vsmacs.clipboardPasteActionCancelSelection',
        async () => {
            await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
            markUnset();
        },
    );
    context.subscriptions.push(clipboardPasteActionCancelSelection);

    // toggleMarkSet
    const toggleMarkSet = vscode.commands.registerCommand('vsmacs.toggleMarkSet', async () => {
        const editor = vscode.window.activeTextEditor;

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');

        if (isMarkSet) {
            markUnset();
        } else {
            markSet(editor.selection.active);
        }
    });
    context.subscriptions.push(toggleMarkSet);

    // cursorLineEndSelect
    const cursorLineEndSelect = vscode.commands.registerCommand('cursorLineEndSelect', async () => {
        const editor = vscode.window.activeTextEditor;

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');
        await vscode.commands.executeCommand('cursorLineEnd');

        if (isMarkSet) {
            editor.selection = getSelection(editor.selection.active);
        }
    });
    context.subscriptions.push(cursorLineEndSelect);

    // cursorLineStartSelect
    const cursorLineStartSelect = vscode.commands.registerCommand('cursorLineStartSelect', async () => {
        const editor = vscode.window.activeTextEditor;

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');
        await vscode.commands.executeCommand('cursorLineStart');

        if (isMarkSet) {
            editor.selection = getSelection(editor.selection.active);
        }
    });
    context.subscriptions.push(cursorLineStartSelect);

    // move[Right, Left, Down, Up, End, Home, Bottom, Top, 'LineEnd', 'LineStart']
    ['Right', 'Left', 'Down', 'Up', 'End', 'Home', 'Bottom', 'Top', 'LineEnd', 'LineStart'].forEach((direction) => {
        const move = vscode.commands.registerCommand(`vsmacs.move${direction}`, async () => {
            const editor = vscode.window.activeTextEditor;

            if (isNil(editor)) {
                return;
            }

            if (!isMarkSet) {
                await vscode.commands.executeCommand(`cursor${direction}`);
                return;
            }

            if (!isNil(markStart)) {
                editor.selection = getSelection(editor.selection.active);
            }

            await vscode.commands.executeCommand(`cursor${direction}Select`);
        });
        context.subscriptions.push(move);
    });

    // normal[Right, Left, Down, Up, End, Home, Bottom, Top]
    ['Right', 'Left', 'Down', 'Up', 'End', 'Home', 'Bottom', 'Top'].forEach((direction) => {
        const move = vscode.commands.registerCommand(`vsmacs.normal${direction}`, async () => {
            await vscode.commands.executeCommand('vsmacs.stopMarkSetCancelSelection');
            await vscode.commands.executeCommand(`cursor${direction}`);
        });
        context.subscriptions.push(move);
    });

    // killing
    const killing = vscode.commands.registerCommand('vsmacs.killing', async () => {
        await vscode.commands.executeCommand('vsmacs.stopMarkSetCancelSelection');
        await vscode.commands.executeCommand('vsmacs.toggleMarkSet');
        await vscode.commands.executeCommand('vsmacs.moveLineEnd');
        await vscode.commands.executeCommand('vsmacs.clipboardCutActionCancelSelection');
    });
    context.subscriptions.push(killing);
}
