import { TimeDisplay } from './time-display';

describe('TimeDisplay', () => {
  describe('toMinutesSeconds()', () => {
    it(`converts milliseconds to minutes:seconds, rounding up on seconds`, () => {
      expect(TimeDisplay.toMinutesSeconds(181001)).toEqual('3:02');
    });

    it(`converts milliseconds to minutes:seconds, padding minutes with zeroes`, () => {
      expect(TimeDisplay.toMinutesSecondsWithZeroes(181001)).toEqual('03:02');
    });
  });
});
