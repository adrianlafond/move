import { h, FunctionalComponent } from 'preact';
import { useContext, useEffect, useState, useRef } from 'preact/hooks';
import * as upIcon from 'typicons.font/src/svg/arrow-up-outline.svg';
import * as downIcon from 'typicons.font/src/svg/arrow-down-outline.svg'

import { AppContext } from '../../app';
import { isNotModified } from '../keyboard';
import { TimeDisplay } from '../../time-display';

let uidIndex = 0;
const ONE_MINUTE = 60 * 1000;

export const InputTime: FunctionalComponent = () => {
  const upIconStr = upIcon as unknown as string;
  const downIconStr = downIcon as unknown as string;

  const { timer } = useContext(AppContext);
  const inputEl = useRef<HTMLInputElement>();
  const focusEntry = useRef(-1);
  const focusEntryStr = useRef('');
  const [displayTime, setDisplayTime] = useState(getDisplayTime());
  const uid = useRef(`input-time-${uidIndex++}`);
  const kbInput = useRef('');
  const kbInputTimeout = useRef(0);

  function getDisplayTime() {
    return TimeDisplay.toHMSwithZeroes(timer.startTime);
  }

  function updateDisplayTime() {
    setDisplayTime(getDisplayTime());
  }

  function onMoreTime() {
    incrementTime(ONE_MINUTE);
  }

  function onLessTime() {
    incrementTime(-ONE_MINUTE);
  }

  function incrementTime(increment: number) {
    timer.changeTime(Math.max(ONE_MINUTE, timer.startTime + increment));
    updateDisplayTime();
    kbInput.current = '';
  }

  function inputNumber(num: string) {
    kbInput.current = `${kbInput.current.substring(kbInput.current.length - 3)}${num}`;
    const len = kbInput.current.length;
    timer.changeTime(len < 3
      ? (asMinutes(kbInput.current))
      : (asHours(kbInput.current)));
    updateDisplayTime();
    clearTimeout(kbInputTimeout.current);
    kbInputTimeout.current = setTimeout(() => {
      kbInput.current = '';
    }, 1000);
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
        if (isInputBlurred()) {
          inputNumber(event.key);
        } else {
          enterFocusData(event.key);
        }
        break;
      default:
        break;
    }
  }

  function selectFocusBlank() {
    setTimeout(() => {
      inputEl.current.setSelectionRange(focusEntry.current, focusEntry.current + 1);
    }, 0);
  }

  function updateCharAtIndex(str: string, char: string, index: number) {
    return `${str.substring(0, index)}${char}${str.substring(index + 1)}`;
  }

  function enterFocusData(key: string = '') {
    focusEntryStr.current = updateCharAtIndex(focusEntryStr.current, key, focusEntry.current);
    if (focusEntry.current === 4) {
      inputEl.current.blur();
    } else {
      let tempDisplayTime = updateCharAtIndex(focusEntryStr.current, key, focusEntry.current);
      focusEntry.current += focusEntry.current === 1 ? 2 : 1;
      tempDisplayTime = updateCharAtIndex(tempDisplayTime, '_', focusEntry.current);
      setDisplayTime(tempDisplayTime);
      selectFocusBlank();
    }
  }

  function onInputFocus() {
    focusEntry.current = 0;
    focusEntryStr.current = getDisplayTime();
    setDisplayTime(updateCharAtIndex(focusEntryStr.current, '_', 0));
    selectFocusBlank();
  }

  function onInputBlur() {
    focusEntry.current = -1;
    const newTime = asHours(focusEntryStr.current.split(':').join('').substring(0, 4));
    timer.changeTime(newTime);
    updateDisplayTime();
  }

  function isInputBlurred() {
    return focusEntry.current === -1;
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
        <label
          htmlFor={uid.current}
          className="input-time-label">
          HH:MM:SS:
        </label>
        <input
          id={uid.current}
          className="input-time"
          type="text"
          value={displayTime}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          ref={inputEl}
          readOnly
        />
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

function asMinutes(input: string) {
  return +input * 60 * 1000;
}

function asHours(input: string) {
  const hours = input.substring(0, input.length === 4 ? 2 : 1);
  return +hours * 60 * 60 * 1000 + asMinutes(input.substring(hours.length));
}
