import { h, FunctionalComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import * as upIcon from 'typicons.font/src/svg/arrow-up-outline.svg';
import * as downIcon from 'typicons.font/src/svg/arrow-down-outline.svg'

import { AppContext } from '../../app';
import { isNotModified } from '../keyboard';
import { TimeDisplay } from '../../time-display';

const ONE_MINUTE = 60 * 1000;

export const InputTime: FunctionalComponent = () => {
  const upIconStr = upIcon as unknown as string;
  const downIconStr = downIcon as unknown as string;
  const { timer } = useContext(AppContext);
  const [time, setTime] = useState(getDisplayTime());

  function getDisplayTime() {
    return TimeDisplay.toMinutesSecondsWithZeroes(timer.startTime);
  }

  function onMoreTime() {
    timer.changeTime(timer.startTime + ONE_MINUTE);
    setTime(getDisplayTime());
  }

  function onLessTime() {
    timer.changeTime(Math.max(ONE_MINUTE, timer.startTime - ONE_MINUTE));
    setTime(getDisplayTime());
  }

  function inputNumber(num: string) {
    console.log(num);
  }

  function onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        if (isNotModified(event)) {
          onMoreTime();
        }
        break;
      case 'ArrowDown':
        if (isNotModified(event)) {
          onLessTime();
        }
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        inputNumber(event.key);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, []);

  return (
    <div className="basic__controls">
      <div className="input-time-container">
        <label className="input-time-label">Minutes:</label>
        <input className="input-time" type="text" value={time} />
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
  );
};
