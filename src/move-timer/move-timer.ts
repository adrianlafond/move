export type Listener = (milliseconds: number) => void;

export const DEFAULT_MILLISECONDS = 20 * 60 * 1000;

export class MoveTimer {
  private startValue: number = DEFAULT_MILLISECONDS;
  private value: number = this.startValue;
  private playing = false;
  private listeners: Set<Listener> = new Set();

  private startDateValue: number;
  private timer: number;

  play(): MoveTimer {
    if (this.isPlaying) {
      return this;
    }
    if (this.isComplete) {
      this.reset();
    }
    this.playing = true;
    this.publish();
    this.timer = setInterval(this.onTick.bind(this), 1);
    return this;
  }

  pause(): MoveTimer {
    this.playing = false;
    clearInterval(this.timer);
    return this;
  }

  stop(): MoveTimer {
    this.value = this.startValue;
    this.publish();
    this.pause();
    return this;
  }

  destroy(): void {
    this.listeners.clear();
    this.stop();
  }

  changeTime(milliseconds: number): MoveTimer {
    const isReset = this.value === this.startValue;
    this.startValue = milliseconds < 0 ? DEFAULT_MILLISECONDS : milliseconds;
    this.value = isReset
      ? this.startValue
      : Math.min(this.startValue, this.value);
    if (this.isPlaying) {
      this.publish();
    }
    return this;
  }

  get time(): number {
    return this.value;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  get isComplete(): boolean {
    return this.value === 0 || this.value === this.startValue;
  }

  addTimeListener(listener: Listener): MoveTimer {
    this.listeners.add(listener);
    return this;
  }

  removeTimeListener(listener: Listener): MoveTimer {
    this.listeners.delete(listener);
    return this;
  }

  private onTick(): void {
    const elapsed = Date.now() - this.startDateValue;
    this.value = Math.max(0, this.startValue - elapsed);
    if (this.value === 0) {
      this.pause();
    }
    this.publish();
  }

  private publish(): void {
    this.listeners.forEach((listener: Listener) => {
      listener(this.value);
    });
  }

  private reset(): void {
    this.value = this.startValue;
    this.startDateValue = Date.now();
  }
}
