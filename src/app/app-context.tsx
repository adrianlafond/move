import { createContext } from 'preact';
import { MoveTimer } from '../move-timer';

export const startContext = {
  theme: 'default',
  timer: new MoveTimer(),
}

export const AppContext = createContext(startContext);
