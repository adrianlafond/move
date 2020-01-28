export class TimeDisplay {
  static padZeroes(value: number, length = 2): string {
    let str = `${value}`;
    while (str.length < length) {
      str = `0${str}`;
    }
    return str;
  }

  static toMinutesSeconds(milliseconds: number, padZeroes = false): string {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = padZeroes
      ? TimeDisplay.padZeroes(totalMinutes)
      : totalMinutes;
    const seconds = TimeDisplay.padZeroes(totalSeconds % 60);
    return `${minutes}:${seconds}`;
  }

  static toMinutesSecondsWithZeroes(milliseconds: number): string {
    return TimeDisplay.toMinutesSeconds(milliseconds, true);
  }
}
