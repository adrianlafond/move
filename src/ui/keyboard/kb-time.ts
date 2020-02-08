import { isNotModified, isCtrl } from './utils';

/**
 * Keyboard commands for control of the *time* view.
 */
export class KbTime {
  constructor(
    private onAction: () => void,
    private onReset: () => void,
    private onSettings: () => void,
  ) {
    this.onKeyPress = this.onKeyPress.bind(this);
    this.initialize();
  }

  private onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        if (isNotModified(event)) {
          this.onAction();
        }
        break;
      case 'r':
        if (isCtrl(event)) {
          this.onReset();
          event.preventDefault();
        }
        break;
      case ',':
        if (isCtrl(event)) {
          this.onSettings();
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  }

  private initialize() {
    window.addEventListener('keydown', this.onKeyPress);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyPress);
  }
}
