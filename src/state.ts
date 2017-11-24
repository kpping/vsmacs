// compare with bitwise
export enum STATE {
    MARK = 1 // 0001
    // foo = 2   // 0010
    // bar = 4   // 0100
    // zee = 8   // 1000
}

export class VSmacsState {
    private static instance: VSmacsState;

    private state: STATE;

    private constructor() {
        this.state = 0;
    }

    public startMarkMode() {
        this.state |= STATE.MARK;
    }

    public isInMarkMode() {
        return this.state & STATE.MARK;
    }

    public stopMarkMode() {
        this.state &= ~STATE.MARK
    }

    public static getInstance() {
        return this.instance || (this.instance = new VSmacsState());
    }
}
