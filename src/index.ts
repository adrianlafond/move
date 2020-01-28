import { MoveTimer } from './move-timer';
import { BasicUi } from './ui/basic';
import './index.css';

const moveTimer = new MoveTimer();
const ui = new BasicUi(moveTimer);
ui.start();
