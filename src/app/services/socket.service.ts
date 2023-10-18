import { Injectable } from '@angular/core';
import { Message } from 'shared/client-to-server/message';
import { GameState } from 'shared/server-to-client/game-state';
import { Socket, io } from 'socket.io-client';
import { GameStateService } from './game-state.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;

  constructor(public gameStateService: GameStateService) { }

  public initSocket(): void {

    this.socket = io();  // Connect to the server

    this.socket.on('game', (gameState: GameState) => {
      console.log('message received: ' + gameState);
      this.gameStateService.syncGameStateFromServer(gameState);
    });

    this.socket.on('disconnect', () => {
      this.socket.emit('leave', this.gameStateService.getGame().getMyID());
    });

  }

  // called to join the server with player name
  public connectToServer(playerName: string): void {
    this.socket.emit('connect', playerName);
  }

  public sendMessageToServer(message: Message): void {
    this.socket.emit('message', message);
  }


  public destroySocket(): void {
    this.socket.disconnect();
    console.log('Disconnected from the server');
  }

}
