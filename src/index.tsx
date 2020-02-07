import { h, render } from 'preact';
import { App } from './app';
import 'modern-css-reset';
import './index.css';
import './favicon.ico';

render(<App />, document.querySelector('#app-root'));
