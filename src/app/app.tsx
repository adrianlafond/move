import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Basic } from '../ui/basic';
import { AppContext, startContext } from './app-context';

export const App: FunctionalComponent = () => {
  const [context, setContext] = useState(startContext);

  return (
    <AppContext.Provider value={context}>
      <Basic timer={context.timer} />
    </AppContext.Provider>
  );
}
