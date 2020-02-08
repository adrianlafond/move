import { h, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { useContext } from 'preact/hooks';
import * as upIcon from 'typicons.font/src/svg/arrow-up-outline.svg';
import * as downIcon from 'typicons.font/src/svg/arrow-down-outline.svg'

import { KbSettings } from '../kb-settings';
import '../shared/basic.css';

import { AppContext } from '../../app';

export const Settings: FunctionalComponent = () => {
  const upIconStr = upIcon as unknown as string;
  const downIconStr = downIcon as unknown as string;
  const { theme } = useContext(AppContext);

  function onMoreTime() {
    console.log('MORE');
  }

  function onLessTime() {
    console.log('LESS');
  }

  useEffect(() => {
    const kb = new KbSettings(onMoreTime, onLessTime);
    return () => {
      kb.destroy();
    };
  }, []);

  return (
    <div className={`basic theme-${theme}`}>
      <div className='basic__settings-main'>
        <h2 className='basic__heading'>Settings</h2>

        <div className="basic__controls">
          <div className="basic__input-time-container">
            <label className="basic__input-time-label">Minutes:</label>
            <input className="basic__input-time" type="text" value="20:00" />
          </div>
          <button
            title="Increase Time"
            onClick={onMoreTime}
            className="basic__button basic__button--icon"
            dangerouslySetInnerHTML={{ __html: upIconStr }}
          />
          <button
            title="Decrease Time"
            onClick={onLessTime}
            className="basic__button basic__button--icon"
            dangerouslySetInnerHTML={{ __html: downIconStr }}
          />
        </div>

        <a href="/" className="basic__button basic__element--full-width">Exit Settings</a>
      </div>
    </div>
  );
};
