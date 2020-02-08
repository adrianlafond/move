import { h, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import page from 'page';
import { Settings } from '../ui/settings';
import { Basic } from '../ui/basic';
import { AppContext, startContext } from './app-context';

type PathType = 'time' | 'settings';

export const App: FunctionalComponent = () => {
  const [context, setContext] = useState(startContext);
  const [path, setPath] = useState<PathType>('time');

  useEffect(() => {
    page({ click: false });
    page('/settings', () => {
      setPath('settings');
    });
    page('/', () => {
      setPath('time');
    });
    page('*', () => {
      setPath('time');
    });
    page();
  }, []);

  return (
    <AppContext.Provider value={context}>
      {path === 'time' ? <Basic timer={context.timer} /> : null}
      {path === 'settings' ? <Settings /> : null}
    </AppContext.Provider>
  );
}
