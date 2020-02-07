import { h, FunctionalComponent } from 'preact';
import { useContext } from 'preact/hooks';
import '../shared/basic.css';

import { AppContext } from '../../app';

export const Settings: FunctionalComponent = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className={`basic theme-${theme}`}>
      <div className='basic__settings-main'>
        <h2 className='basic__heading'>Settings</h2>

        <ul>
          <li>start time</li>
          <li>theme</li>
        </ul>

        <a href="/">exit</a>
      </div>
    </div>
  );
};
