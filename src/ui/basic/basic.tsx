import { h, FunctionalComponent } from 'preact';
import { MoveTimer } from '../../move-timer';

import './basic.css';

export const Basic: FunctionalComponent<{ timer: MoveTimer }> = ({ timer }) => {
  return (
    <div className="basic">
      <h1 className="basic__time">00:00</h1>
      <button className="basic__button-action">Start</button>
      <button className="basic__button-reset">Reset</button>
    </div>
  );
};
