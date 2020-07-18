import socketio from 'socket.io-client';
import { serverURL } from '../api/axiosWrapper';

const socket = socketio.connect(serverURL);

(() => {
  socket.emit('init', { name: 'bella' });

  socket.on("welcome", (msg) => {
    console.log("msg : ", msg);
  })
});