import { MoveTimer } from './move-timer';

describe('MoveTimer', () => {
  it(`has a method called 'start'`, () => {
    const moveTimer = new MoveTimer();
    expect(typeof moveTimer.start).toEqual('function');
  });
});
