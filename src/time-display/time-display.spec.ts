import { TimeDisplay } from './time-display';

const HOUR = 1000 * 60 * 60;

describe('TimeDisplay', () => {
  describe('converts milliseconds to minutes:seconds()', () => {
    it(`converts milliseconds to minutes:seconds, rounding up on seconds`, () => {
      expect(TimeDisplay.toMS(181001)).toEqual('3:02');
    });

    it(`converts milliseconds to minutes:seconds, padding with zeroes`, () => {
      expect(TimeDisplay.toMSwithZeroes(181001)).toEqual('03:02');
    });
  });

  describe('converts milliseconds to hours:minutes:seconds()', () => {
    it(`converts milliseconds to minutes:seconds, rounding up on seconds`, () => {
      expect(TimeDisplay.toHMS(2 * HOUR + 181001)).toEqual('2:03:02');
    });

    it(`converts milliseconds to hours:minutes:seconds, padding with zeroes`, () => {
      expect(TimeDisplay.toHMSwithZeroes(2 * HOUR + 181001)).toEqual('02:03:02');
    });
  });
});
