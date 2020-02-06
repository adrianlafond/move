import { h, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import page from 'page';
import { Settings } from '../ui/settings';
import { Basic } from '../ui/basic';
import { AppContext, startContext } from './app-context';

export const App: FunctionalComponent = () => {
  const [context, setContext] = useState(startContext);
  const [path, setPath] = useState('/');

  useEffect(() => {
    page({ click: false });
    page('/settings', () => {
      setPath('/settings');
    });
    page('/', () => {
      setPath('/');
    });
    page('*', () => {
      setPath('/');
    });
    page();
  }, []);

  return (
    <AppContext.Provider value={context}>
      {path === '/' ? <Basic timer={context.timer} /> : null}
      {path === '/settings' ? <Settings /> : null}
    </AppContext.Provider>
  );
}
