import * as vscode from 'vscode';
import { activate as activateCommandWindow } from './command-window';
import { activate as activateCommandMove } from './command-move';
import { activate as activateCommandEdit } from './command-edit';
import { activate as activateCommandSearch } from './command-search';

export function activate(context: vscode.ExtensionContext): void {
    activateCommandWindow(context);
    activateCommandMove(context);
    activateCommandEdit(context);
    activateCommandSearch(context);
}
