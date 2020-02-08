import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { useContext } from 'preact/hooks';
import page from 'page';

import { AppContext } from '../../app';
import { InputTime } from '../input-time';

export const Settings: FunctionalComponent = () => {
  const { theme } = useContext(AppContext);

  function onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      page.show('/');
      event.preventDefault();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, []);

  return (
    <div className={`basic theme-${theme}`}>
      <div className='basic__settings-main'>
        <h2 className='basic__heading'>Settings</h2>
        <InputTime />
        <a href="/" className="basic__button basic__element--full-width">Exit Settings</a>
      </div>
    </div>
  );
};
