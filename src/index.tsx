import { h, render } from 'preact';
import { App } from './app';
import './index.css';
import './static/favicon.ico';

render(<App />, document.querySelector('#app-root'));
