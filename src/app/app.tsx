import { h, FunctionalComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { MoveTimer } from '../move-timer';
import { Basic } from '../ui/basic';
import { AppContext } from './app-context';

export const App: FunctionalComponent = () => {
  const [context, setContext] = useState({
    theme: 'default',
    timer: new MoveTimer(),
  });

  return (
    <AppContext.Provider value={context}>
      <Basic timer={context.timer} />
    </AppContext.Provider>
  );
}
