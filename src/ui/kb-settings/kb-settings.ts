/**
 * Keyboard commands for control of the *settings* view.
 */
export class KbSettings {
  constructor(private onUp: () => void, private onDown: () => void) {
    this.onKeyPress = this.onKeyPress.bind(this);
    this.initialize();
  }

  private onKeyPress(event: KeyboardEvent) {
    const notModified = !event.altKey && !event.ctrlKey && !event.shiftKey;
    switch (event.key) {
      case 'ArrowUp':
        if (notModified) {
          this.onUp();
        }
        break;
      case 'ArrowDown':
        if (notModified) {
          this.onDown();
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
