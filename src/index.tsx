import { h, render } from 'preact';
import { MoveTimer } from './move-timer';
import { Basic } from './ui';
import './index.css';
import './static/favicon.ico';

const moveTimer = new MoveTimer();

render(<Basic timer={moveTimer} />, document.querySelector('#app-root'));
