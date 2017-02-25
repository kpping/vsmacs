import { Position } from 'vscode';

export class MarkMode {
    private static _instance: MarkMode;

    private _isMarkMode: boolean;
    private currentCursorPostion: Position;

    private constructor() {
        this._isMarkMode = false;
    }

    public startMarkMode(cursorPosition: Position) {
        this._isMarkMode = true;
        this.currentCursorPostion = cursorPosition;
    }

    public isMarkMode() {
        return this._isMarkMode;
    }

    public stopMarkMode() {
        this._isMarkMode = false;
        this.currentCursorPostion = void(0);
    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }
}