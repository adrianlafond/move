import { createContext } from 'preact';
import { MoveTimer } from '../move-timer';

export const startContext = {
  theme: 'default',
  timer: new MoveTimer(),
  startTime: 20 * 60 * 1000,
};

export const AppContext = createContext(startContext);
