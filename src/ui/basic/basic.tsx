import { h, FunctionalComponent } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import page from 'page';
import * as cogIcon from 'typicons.font/src/svg/cog-outline.svg';

import { AppContext } from '../../app';
import { UiProps } from '../types';
import { TimeDisplay } from '../../time-display';
import { KbTime } from '../keyboard';

import '../shared/basic.css';
import '../themes/default.css';

const ONE_HOUR = 1000 * 60 * 60;

export const Basic: FunctionalComponent<UiProps> = ({ timer }) => {
  const cogIconStr = cogIcon as unknown as string;
  const { theme } = useContext(AppContext);

  const [time, setTime] = useState(getDisplayTime());
  const [actionLabel, setActionLabel] = useState('Start');

  function getDisplayTime() {
    return timer.time < ONE_HOUR
      ? TimeDisplay.toMSwithZeroes(timer.time)
      : TimeDisplay.toHMSwithZeroes(timer.time);
  }

  function onTime(milliseconds: number) {
    const isComplete = milliseconds === 0;
    setTime(
      isComplete
        ? 'Move!'
        : getDisplayTime(),
    );
    setActionLabel(isComplete ? 'Start' : 'Pause');
  }

  function onAction() {
    if (timer.isPlaying) {
      timer.pause();
      setActionLabel('Start');
    } else {
      timer.play();
      setActionLabel('Pause');
    }
  }

  function onReset() {
    timer.stop();
    setActionLabel('Start');
  }

  function onSettings() {
    page.show('/settings');
  }

  useEffect(() => {
    const kb = new KbTime(onAction, onReset, onSettings);
    timer.addTimeListener(onTime);
    return () => {
      timer.removeTimeListener(onTime);
      kb.destroy();
    };
  }, []);

  return (
    <div className={`basic theme-${theme}`}>
      <div className='basic__time-main'>
        <h1 className="basic__time">{time}</h1>
        <div className="basic__controls">
          <button
            title={actionLabel}
            onClick={onAction}
            className="basic__button">
            {actionLabel}
          </button>
          <button
            title="Reset"
            onClick={onReset}
            className="basic__button"
            disabled={timer.isReset}>
            Reset
          </button>
          <button
            title="Settings"
            onClick={onSettings}
            className="basic__button basic__button--icon"
            dangerouslySetInnerHTML={{ __html: cogIconStr }}
          />
        </div>
      </div>
    </div>
  );
};
