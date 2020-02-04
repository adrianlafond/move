export declare type Listener = (milliseconds: number) => void;
export declare const DEFAULT_MILLISECONDS: number;
export declare class MoveTimer {
    private startValue;
    private value;
    private playing;
    private listeners;
    private startDateValue;
    private timer;
    play(): MoveTimer;
    pause(): MoveTimer;
    stop(): MoveTimer;
    destroy(): void;
    changeTime(milliseconds: number): MoveTimer;
    get time(): number;
    get isPlaying(): boolean;
    get isComplete(): boolean;
    get isReset(): boolean;
    addTimeListener(listener: Listener): MoveTimer;
    removeTimeListener(listener: Listener): MoveTimer;
    private onTick;
    private publish;
    private reset;
}
