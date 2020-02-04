import { MoveTimer } from './move-timer';
import { BasicUi } from './ui/basic';
import './index.css';
import './static/favicon.ico';

const moveTimer = new MoveTimer();
const ui = new BasicUi(moveTimer);
ui.start();
