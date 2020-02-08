/**
 * Keyboard commands for control of the *time* view.
 */
export class KbTime {
  constructor(private onAction: () => void, private onReset: () => void) {
    this.onKeyPress = this.onKeyPress.bind(this);
    this.initialize();
  }

  private onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
        if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
          this.onAction();
        }
        break;
      case 'R':
        if (!event.altKey && !event.ctrlKey && event.shiftKey) {
          this.onReset();
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
