import * as vscode from 'vscode';
import { MarkMode } from './markmode';

export function activate(context: vscode.ExtensionContext) {
    // COMMAND: vsmacs.PreviousMatchFindAction_CloseFindWidget
    // DO: select the previous text and close find widget
    // WHY: when user hit `enter`, cursor move to the next text, so we have to move it back
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.PreviousMatchFindAction_CloseFindWidget', 
            () => {
                vscode.commands.executeCommand('editor.action.previousMatchFindAction');

                vscode.commands.executeCommand('closeFindWidget');
            }
    ));

    // COMMAND: vsmacs.StartMarkMode
    // DO: start markmode
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.StartMarkMode', 
            () => {
                let cursorPosition = vscode.window.activeTextEditor.selection.active;

                MarkMode.getInstance().startMarkMode(cursorPosition);

                vscode.window.activeTextEditor.selection = new vscode.Selection(cursorPosition, cursorPosition);

                vscode.window.setStatusBarMessage("Mark Set", 1000);
            }
    ));

    // COMMAND: vsmacs.StopMarkMode
    // DO: stop markmode
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.StopMarkMode', 
            () => {
                vscode.commands.executeCommand("cancelSelection");

                MarkMode.getInstance().stopMarkMode();

                vscode.window.setStatusBarMessage("Quit", 1000);
            }
    ));

    // COMMAND: vsmacs.MoveCursorX and vsmacs.MoveCursorXSelect
    // DO: move cursor
    ['Up', 'Down', 'Left', 'Right', 'Home', 'End', 'Top', 'Bottom'].forEach((val) => {
        context.subscriptions.push(
            vscode.commands.registerCommand(
                `vsmacs.MoveCursor${val}`, 
                () => {
                    if (MarkMode.getInstance().isMarkMode()) {
                        vscode.commands.executeCommand(`cursor${val}Select`);
                    } else {
                        vscode.commands.executeCommand(`cursor${val}`);
                    }
                }
        ));
    });

    // COMMAND: vsmacs.Copy
    // DO: copy text in marking area to global (os) clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.Copy', 
            () => {
                MarkMode.getInstance().stopMarkMode();

                vscode.commands.executeCommand('editor.action.clipboardCopyAction');

                vscode.window.setStatusBarMessage("Copy", 1000);
            }
    ));

    // COMMAND: vsmacs.Cut
    // DO: cut text in marking area to global (os) clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.Cut', 
            () => {
                MarkMode.getInstance().stopMarkMode();

                vscode.commands.executeCommand('editor.action.clipboardCutAction');

                vscode.window.setStatusBarMessage("Cut", 1000);
            }
    ));

    // COMMAND: vsmacs.Paste
    // DO: paste text from global (os) clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.Paste', 
            () => {
                MarkMode.getInstance().stopMarkMode();

                vscode.commands.executeCommand('editor.action.clipboardPasteAction');

                vscode.window.setStatusBarMessage("Paste", 1000);
            }
    ));

    // COMMAND: vsmacs.Kill
    // DO: cut text from cursor to the end of line to global (os) clipboard
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'vsmacs.Kill', 
            () => {
                MarkMode.getInstance().stopMarkMode();

                let cursorPosition = vscode.window.activeTextEditor.selection.active;

                vscode.commands.executeCommand('cursorEndSelect');
                vscode.commands.executeCommand('editor.action.clipboardCopyAction');

                vscode.window.activeTextEditor.selection = new vscode.Selection(cursorPosition, cursorPosition);

                vscode.commands.executeCommand('deleteAllRight');

                vscode.window.setStatusBarMessage("Kill", 1000);
            }
    ));
}

export function deactivate() {
}