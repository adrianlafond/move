import { MoveTimer } from '../../move-timer';
export declare class BasicUi {
    private timer;
    private time;
    private btnAction;
    private btnReset;
    private running;
    constructor(timer: MoveTimer);
    start(): void;
    stop(): void;
    private onTime;
    private onAction;
    private onReset;
}
