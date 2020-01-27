export type Listener = (milliseconds: number) => void;

export const DEFAULT_MILLISECONDS = 20 * 60 * 1000;

export class MoveTimer {
  private startValue: number = DEFAULT_MILLISECONDS;
  private value: number = this.startValue;
  private playing = false;
  private listeners: Set<Listener> = new Set();

  play(): void {
    this.playing = true;
  }

  pause(): void {
    this.playing = false;
  }

  stop(): void {
    this.playing = false;
  }

  destroy(): void {
    this.playing = false;
  }

  changeTime(milliseconds: number): MoveTimer {
    const isReset = this.value === this.startValue;
    this.startValue = milliseconds < 0 ? DEFAULT_MILLISECONDS : milliseconds;
    this.value = isReset
      ? this.startValue
      : Math.min(this.startValue, this.value);
    return this;
  }

  get time(): number {
    return this.value;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  // addTickListener(listener: Listener): MoveTimer {
  //   this.listeners.add(listener);
  //   return this;
  // }

  // removeTickListener(listener: Listener): MoveTimer {
  //   this.listeners.delete(listener);
  //   return this;
  // }
}
