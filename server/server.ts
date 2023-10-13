import { Socket } from "socket.io";

const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const path = require('path');
const morgan = require('morgan');

const app = express();
const server = createServer(app);
const io = new Server(server);

const port: string | number = process.env['PORT'] || 3000;

app.use(express.static(path.join(__dirname, '/../dist/multiplayer')));
app.use(morgan('dev')); // 'dev' is one of the predefined formats provided by Morgan

app.use(express.json());

io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);

        socket.emit('message', "Server echos " + msg);

      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

// Connect to server
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
