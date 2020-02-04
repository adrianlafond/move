import { h, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { UiProps } from '../types';
import { TimeDisplay } from '../../time-display';

import './basic.css';

export const Basic: FunctionalComponent<UiProps> = ({ timer }) => {
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
    if(timer.isPlaying) {
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
    <div className="basic">
      <h1 className="basic__time">{time}</h1>
      <button onClick={onAction} className="basic__button-action">{actionLabel}</button>
      <button onClick={onReset} className="basic__button-reset">Reset</button>
    </div>
  );
};
