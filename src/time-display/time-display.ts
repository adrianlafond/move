export class TimeDisplay {
  static padZeroes(value: number, length = 2): string {
    let str = `${value}`;
    while (str.length < length) {
      str = `0${str}`;
    }
    return str;
  }

  static toMS(milliseconds: number, padZeroes = false): string {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = padZeroes
      ? TimeDisplay.padZeroes(totalMinutes)
      : totalMinutes;
    const seconds = TimeDisplay.padZeroes(totalSeconds % 60);
    return `${minutes}:${seconds}`;
  }

  static toMSwithZeroes(milliseconds: number): string {
    return TimeDisplay.toMS(milliseconds, true);
  }

  static toHMS(milliseconds: number, padZeroes = false): string {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const seconds = TimeDisplay.padZeroes(totalSeconds % 60);
    const minutes = TimeDisplay.padZeroes(totalMinutes % 60);
    const hours = padZeroes
      ? TimeDisplay.padZeroes(totalHours)
      : totalHours;
    return `${hours}:${minutes}:${seconds}`;
  }

  static toHMSwithZeroes(milliseconds: number): string {
    return this.toHMS(milliseconds, true);
  }
}
