import React from 'react';
import * as ReactDOM from 'react-dom';
import spriteSVG from '../node_modules/ionicons/dist/ionicons.symbols.svg';
import { App } from './components';
import './styles/index.css';

ReactDOM.render(
  <>
    <div style={{display: 'none'}} dangerouslySetInnerHTML={{__html: spriteSVG}} />
    <App />
  </>,
  document.getElementById('app')
);