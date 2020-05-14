import * as vscode from 'vscode';
import { activate as activateCommandCode } from './command-code';
import { activate as activateCommandEdit } from './command-edit';
import { activate as activateCommandEscape } from './command-escape';
import { activate as activateCommandHistory } from './command-history';
import { activate as activateCommandMark } from './command-mark';
import { activate as activateCommandSelect } from './command-select';
import { activate as activateCommandWindow } from './command-window';
import { activate as activateEventWindow } from './event-window';

export function activate(context: vscode.ExtensionContext): void {
    activateCommandCode(context);
    activateCommandEdit(context);
    activateCommandEscape(context);
    activateCommandHistory(context);
    activateCommandMark(context);
    activateCommandSelect(context);
    activateCommandWindow(context);

    activateEventWindow(context);
}
