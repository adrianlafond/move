/**
 * Keyboard commands for control of the *time* view.
 */
export declare class KbTime {
    private onAction;
    private onReset;
    private onSettings;
    constructor(onAction: () => void, onReset: () => void, onSettings: () => void);
    private onKeyPress;
    private initialize;
    destroy(): void;
}
