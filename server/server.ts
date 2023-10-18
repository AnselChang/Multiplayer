import { Socket } from "socket.io";
import { ServerGame } from "./server-models/server-game";

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

const game = new ServerGame();

io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.on('connect', (playerName: string) => {
        console.log('Player connected with name: ' + playerName);
        game.addPlayer(playerName);

      });

    socket.on('leave', (playerID: number) => {
        console.log('Player leaving server with ID: ' + playerID);
        game.removePlayer(playerID);
    });

});

setInterval(() => {
    console.log('sending game state to all clients');
}, 100); // 10 times per second

// Connect to server
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
