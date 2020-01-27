import { MoveTimer, DEFAULT_MILLISECONDS } from './move-timer';

describe('MoveTimer', () => {
  let timer: MoveTimer;

  beforeEach(() => {
    if (timer) {
      timer.destroy();
    }
    timer = new MoveTimer();
  });

  it(`starts with a time equal to DEFAULT_MILLISECONDS`, () => {
    expect(timer.time).toEqual(DEFAULT_MILLISECONDS);
  });

  describe(`playing`, () => {
    it(`is not playing by default`, () => {
      expect(timer.isPlaying).toBe(false);
    });

    it(`sets playing to true on play()`, () => {
      timer.play();
      expect(timer.isPlaying).toBe(true);
    });

    it(`sets playing to false on pause()`, () => {
      timer.play();
      timer.pause();
      expect(timer.isPlaying).toBe(false);
    });

    it(`sets playing to false on stop()`, () => {
      timer.play();
      timer.stop();
      expect(timer.isPlaying).toBe(false);
    });

    it(`sets playing to false on destroy()`, () => {
      timer.play();
      timer.destroy();
      expect(timer.isPlaying).toBe(false);
    });
  });

  describe('changeTime()', () => {
    it(`updates the time`, () => {
      timer.changeTime(DEFAULT_MILLISECONDS + 1000);
      expect(timer.time).toEqual(DEFAULT_MILLISECONDS + 1000);
    });

    it(`resets the time to DEFAULT_MILLISECONDS if changed to a value < 0`, () => {
      timer.changeTime(-1000);
      expect(timer.time).toEqual(DEFAULT_MILLISECONDS);
    });

    it(`returns an instance reference for chaining`, () => {
      const instance = timer.changeTime(10000);
      expect(instance).toBe(timer);
    });
  });
});
