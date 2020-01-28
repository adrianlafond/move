import { MoveTimer, Listener, DEFAULT_MILLISECONDS } from './move-timer';

function delay(milliseconds = 100): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('MoveTimer', () => {
  let timer: MoveTimer;

  beforeEach(() => {
    if (timer) {
      timer.destroy();
    }
    timer = new MoveTimer();
  });

  describe('changeTime()', () => {
    it(`starts with a time equal to DEFAULT_MILLISECONDS`, () => {
      expect(timer.time).toEqual(DEFAULT_MILLISECONDS);
    });

    it(`updates the time`, () => {
      timer.changeTime(DEFAULT_MILLISECONDS + 1000);
      expect(timer.time).toEqual(DEFAULT_MILLISECONDS + 1000);
    });

    it(`resets the time to DEFAULT_MILLISECONDS if changed to a value < 0`, () => {
      timer.changeTime(-1000);
      expect(timer.time).toEqual(DEFAULT_MILLISECONDS);
    });
  });

  describe(`returns an instance reference from relevant methods for chaining`, () => {
    it(`returns instance from play()`, () => {
      const instance = timer.play();
      expect(instance).toBe(timer);
    });

    it(`returns instance from pause()`, () => {
      const instance = timer.pause();
      expect(instance).toBe(timer);
    });

    it(`returns instance from stop()`, () => {
      const instance = timer.stop();
      expect(instance).toBe(timer);
    });

    it(`returns instance from changeTime()`, () => {
      const instance = timer.changeTime(10000);
      expect(instance).toBe(timer);
    });

    it(`returns instance from addTimeListener()`, () => {
      const instance = timer.addTimeListener(() => undefined);
      expect(instance).toBe(timer);
    });

    it(`returns instance from removeTimeListener()`, () => {
      const instance = timer.removeTimeListener(() => undefined);
      expect(instance).toBe(timer);
    });
  });

  describe(`playing`, () => {
    it(`is not playing by default`, () => {
      expect(timer.isPlaying).toBe(false);
    });

    it(`sets playing to true on play()`, () => {
      timer.play();
      expect(timer.isPlaying).toBe(true);
    });

    it(`merely returns instance if play() is called while already playing`, () => {
      timer.play();
      expect(timer.isPlaying).toBe(true);
      const instance = timer.play();
      expect(timer.isPlaying).toBe(true);
      expect(instance).toBe(timer);
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

  describe(`events`, () => {
    it(`publishes an event immediately on play`, done => {
      timer.addTimeListener((milliseconds: number) => {
        expect(milliseconds === DEFAULT_MILLISECONDS).toBe(true);
        done();
      });
      timer.play();
    });

    it(`publishes an event on play after time passes`, async done => {
      timer.play();
      await delay();
      timer.addTimeListener((milliseconds: number) => {
        expect(milliseconds < DEFAULT_MILLISECONDS).toBe(true);
        done();
      });
    });

    it(`stops playing when time reaches 0`, done => {
      timer.changeTime(100);
      timer.addTimeListener((milliseconds: number) => {
        if (milliseconds === 0) {
          expect(timer.isPlaying).toBe(false);
          done();
        }
      });
      timer.play();
    });

    it(`stops publishing to a removed listener`, async done => {
      const listener = jest.fn(() => undefined);

      // Add a listener which will be called immediately on play().
      timer.addTimeListener(listener);
      timer.play();
      expect(listener.mock.calls.length).toBe(1);

      // After some time has passed, the listener will have been called
      // numerous times.
      await delay();
      const callsLength = listener.mock.calls.length;
      expect(callsLength).toBeGreaterThan(1);

      // The timer continues to play but the listener is removed, so number of
      // calls does not increase.
      timer.removeTimeListener(listener);
      await delay();
      expect(listener.mock.calls.length).toBe(callsLength);
      done();
    });

    it(`adds and calls the same listener only once per play event`, () => {
      const listener = jest.fn(() => undefined);
      timer.addTimeListener(listener);
      timer.addTimeListener(listener);
      timer.play();
      expect(listener.mock.calls.length).toBe(1);
    });
  });
});
