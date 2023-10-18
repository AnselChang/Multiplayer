import { Socket } from "socket.io";
import { ServerGame } from "./server-models/server-game";
import { GameState } from "../shared/server-to-client/game-state";

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

    socket.on('joingame', (playerName: string) => {
        console.log('Player connected with name: ' + playerName);
        game.addPlayer(playerName);

      });

    socket.on('leavegame', (playerID: number) => {
        console.log('Player leaving server with ID: ' + playerID);
        game.removePlayer(playerID);
    });

});

setInterval(() => {

    const generalGameState = game.generateGeneralGameState();
    
    // send game state to all connected players
    game.getPlayerIDs().forEach((id) => {
        const tailoredGameState = game.generateTailoredGameState(id);
        const gameState = new GameState(generalGameState, tailoredGameState);
        console.log('sending game state to player with ID: ' + id, gameState);
        io.emit('game', gameState);
    });

}, 1000); // 1 times per second

// Connect to server
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
