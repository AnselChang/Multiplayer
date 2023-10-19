import { Socket } from "socket.io";
import { ServerGame } from "./server-models/server-game";
import { GameState } from "../shared/server-to-client/game-state";
import { DirectionalPlayerInputMessage, Message, MessageType } from "../shared/client-to-server/message";

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
const clients = new Map<string, Socket>(); // a map of all connected clients

const FPS = 60;

io.on('connection', (socket: Socket) => {
    console.log('A user connected with ID: ' + socket.id);
    clients.set(socket.id, socket);

    socket.on('message', (message: Message) => {
      const player = game.getPlayerByID(socket.id);

      if (message.type === MessageType.DIRECTIONAL_PLAYER_INPUT) {
        const dMessage = message as DirectionalPlayerInputMessage;
        player.input.direction = dMessage.direction;
        player.input.magnitude = dMessage.magnitude;
      }

    });

    socket.on('joingame', (playerName: string) => {
        console.log('Player joined game with name: ' + playerName);
        game.addPlayer(socket.id, playerName);

      });

    socket.on('leavegame', (playerName: string) => {
        console.log('Player left game with name: ' + playerName);
        game.removePlayer(socket.id);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected with ID: ' + socket.id);
      game.removePlayer(socket.id);
      clients.delete(socket.id);
  });

});

setInterval(() => {

    // update the game state
    game.update();

    const generalGameState = game.generateGeneralGameState();
    
    // send game state to all connected players
    game.getPlayerIDs().forEach((clientID) => {
        const tailoredGameState = game.generateTailoredGameState(clientID);
        const gameState = new GameState(generalGameState, tailoredGameState);

        // find the socket with the given id and send the game state to it (if it exists)
        const clientSocket = clients.get(clientID);
        if (clientSocket) {
            clientSocket.emit('game', gameState);
        }

    });

}, 1000 / FPS);

// Connect to server
server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
