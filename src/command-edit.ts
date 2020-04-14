import * as vscode from 'vscode';
import { getActiveTextEitor, getCurrentPosistion, unsetMarkMode, setMarkMode, updateSelection } from './utils';
import { isNil } from '@ag1/nil';
import { isNumber } from 'util';
import { getState } from './state';

export function getStopMarkMode(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.stopMarkMode', async () => {
        await vscode.commands.executeCommand('cancelSelection');
        unsetMarkMode();
    });
}

export function getLineBreakInsert(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.lineBreakInsert', async () => {
        await vscode.commands.executeCommand('lineBreakInsert');
        await vscode.commands.executeCommand('cursorDown');
        await vscode.commands.executeCommand('cursorLineStart');
    });
}

export function getClipboardCopyAction(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.clipboardCopyAction', async () => {
        await vscode.commands.executeCommand('editor.action.clipboardCopyAction');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
}

export function getClipboardCutAction(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.clipboardCutAction', async () => {
        await vscode.commands.executeCommand('editor.action.clipboardCutAction');
        unsetMarkMode();
    });
}

export function getClipboardPasteAction(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.clipboardPasteAction', async () => {
        await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
        unsetMarkMode();
    });
}

export function getToggleMarkMode(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.toggleMarkMode', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        await vscode.commands.executeCommand('cancelSelection');

        if (getState().isMarkMode) {
            unsetMarkMode();
        } else {
            setMarkMode(getCurrentPosistion(editor));
        }
    });
}

export function getDeleteLeft(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.deleteLeft', async () => {
        await vscode.commands.executeCommand('deleteLeft');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
}

export function getDeleteRight(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.deleteRight', async () => {
        await vscode.commands.executeCommand('deleteRight');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
}

export function getDeleteWordRight(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.deleteWordRight', async () => {
        await vscode.commands.executeCommand('deleteWordRight');
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
    });
}

export function getKilling(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.killing', async () => {
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
        await vscode.commands.executeCommand('vsmacs.toggleMarkMode');
        await vscode.commands.executeCommand('vsmacs.moveLineEnd');
        await vscode.commands.executeCommand('vsmacs.clipboardCutAction');
    });
}

export function getGotoChar(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.gotoChar', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        const validateInput = (numStr: string): string => {
            const num = parseInt(numStr, 10);
            const isValid = !isNaN(num) && isNumber(num) && num >= 0;

            return isValid ? '' : 'Please enter a number.';
        };

        // get value after input box is closed
        const numStr = await vscode.window.showInputBox({
            placeHolder: 'Enter character position',
            prompt: 'Goto char:',
            validateInput,
        });

        // if cancel
        if (isNil(numStr)) {
            return;
        }

        // update selection
        editor.selection = updateSelection(editor.document.positionAt(parseInt(numStr, 10)));

        // scroll to active position
        const activePosition = editor.selection.active;
        editor.revealRange(new vscode.Range(activePosition, activePosition));
    });
}

export function getGotoLine(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.gotoLine', async () => {
        const editor = getActiveTextEitor();

        if (isNil(editor)) {
            return;
        }

        const validateInput = (numStr: string): string => {
            const num = parseInt(numStr, 10);
            const isValid = !isNaN(num) && isNumber(num) && num >= 1;

            return isValid ? '' : 'Please enter a number.';
        };

        // get value after input box is closed
        const numStr = await vscode.window.showInputBox({
            placeHolder: 'Enter line number',
            prompt: 'Goto line:',
            validateInput,
        });

        // if cancel
        if (isNil(numStr)) {
            return;
        }

        // update selection
        editor.selection = updateSelection(new vscode.Position(parseInt(numStr, 10) - 1, 0));

        // scroll to active position
        const activePosition = editor.selection.active;
        editor.revealRange(new vscode.Range(activePosition, activePosition));
    });
}

export function getSelectAll(): vscode.Disposable {
    return vscode.commands.registerCommand('vsmacs.selectAll', async () => {
        await vscode.commands.executeCommand('vsmacs.stopMarkMode');
        await vscode.commands.executeCommand('vsmacs.moveBottom');
        await vscode.commands.executeCommand('vsmacs.toggleMarkMode');
        await vscode.commands.executeCommand('vsmacs.moveTop');
    });
}

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(getStopMarkMode());
    context.subscriptions.push(getLineBreakInsert());
    context.subscriptions.push(getClipboardCopyAction());
    context.subscriptions.push(getClipboardCutAction());
    context.subscriptions.push(getClipboardPasteAction());
    context.subscriptions.push(getToggleMarkMode());
    context.subscriptions.push(getDeleteLeft());
    context.subscriptions.push(getDeleteRight());
    context.subscriptions.push(getDeleteWordRight());
    context.subscriptions.push(getKilling());
    context.subscriptions.push(getGotoChar());
    context.subscriptions.push(getGotoLine());
    context.subscriptions.push(getSelectAll());
}
