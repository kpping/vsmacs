import * as vscode from 'vscode';
import { activate as activateCode } from './command-code';
import { activate as activateEdit } from './command-edit';
import { activate as activateEscape } from './command-escape';
import { activate as activateHistory } from './command-history';
import { activate as activateMark } from './command-mark';
import { activate as activateSelect } from './command-select';
import { activate as activateWindow } from './command-window';

export function activate(context: vscode.ExtensionContext): void {
    activateCode(context);
    activateEdit(context);
    activateEscape(context);
    activateHistory(context);
    activateMark(context);
    activateSelect(context);
    activateWindow(context);
}
