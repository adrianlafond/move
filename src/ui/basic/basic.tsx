import { h, FunctionalComponent } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { AppContext } from '../../app';
import { UiProps } from '../types';
import { TimeDisplay } from '../../time-display';

import './basic.css';
import './themes/default.css';

export const Basic: FunctionalComponent<UiProps> = ({ timer }) => {
  const { theme } = useContext(AppContext);

  const [time, setTime] = useState(
    `${TimeDisplay.toMinutesSecondsWithZeroes(timer.time)}`,
  );
  const [actionLabel, setActionLabel] = useState('Start');

  function onTime(milliseconds: number) {
    const isComplete = milliseconds === 0;
    setTime(
      isComplete
        ? 'Move!'
        : `${TimeDisplay.toMinutesSecondsWithZeroes(milliseconds)}`,
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

  useEffect(() => {
    timer.addTimeListener(onTime);
    return () => {
      timer.removeTimeListener(onTime);
    };
  });

  return (
    <div className={`basic theme-${theme}`}>
      <div className='basic__inner'>
        <h1 className="basic__time">{time}</h1>
        <button onClick={onAction} className="basic__button">{actionLabel}</button>
        <button onClick={onReset} className="basic__button" disabled={timer.isReset}>Reset</button>
      </div>
    </div>
  );
};
