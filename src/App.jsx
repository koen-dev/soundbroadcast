import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import io from 'socket.io-client';

let socket = io('http://localhost:8080');

ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);

socket.on('connect', () => {
    console.log('Socket connected!');
});

socket.on('news', (data) => {
    console.log(data);
});

window.test = (msg) => {
    socket.emit('message', msg);
};
