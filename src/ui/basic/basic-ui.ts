import { MoveTimer } from '../../move-timer';
import { TimeDisplay } from '../../time-display';

export class BasicUi {
  private time: HTMLElement;
  private btnAction: HTMLButtonElement;
  private btnReset: HTMLButtonElement;
  private running = false;

  constructor(private timer: MoveTimer) {
    this.time = document.querySelector('.basic-ui__time');
    this.btnAction = document.querySelector('.basic-ui__button-action');
    this.btnReset = document.querySelector('.basic-ui__button-reset');
    this.onTime(timer.time);
  }

  start(): void {
    if (this.running) {
      return;
    }
    this.timer.addTimeListener(this.onTime.bind(this));
    this.btnAction.addEventListener('click', this.onAction.bind(this));
    this.btnReset.addEventListener('click', this.onReset.bind(this));
  }

  stop(): void {
    this.timer.removeTimeListener(this.onTime.bind(this));
    this.btnAction.removeEventListener('click', this.onAction.bind(this));
    this.btnReset.removeEventListener('click', this.onReset.bind(this));
  }

  private onTime(milliseconds: number): void {
    const isComplete = milliseconds === 0;
    this.time.textContent = isComplete
      ? 'Move!'
      : `${TimeDisplay.toMinutesSecondsWithZeroes(milliseconds)}`;
    if (isComplete) {
      this.btnAction.textContent = 'Start';
    }
  }

  private onAction(): void {
    if (this.timer.isPlaying) {
      this.timer.pause();
      this.btnAction.textContent = 'Start';
    } else {
      this.timer.play();
      this.btnAction.textContent = 'Pause';
    }
  }

  private onReset(): void {
    this.timer.stop();
    this.btnAction.textContent = 'Start';
  }
}
