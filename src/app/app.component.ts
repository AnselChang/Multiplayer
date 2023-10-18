import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { SocketService } from './services/socket.service';
import { GameStateService } from './services/game-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'multiplayer';

  constructor(private gameService: GameStateService, private socketService: SocketService) {}

  public isConnectedToServer(): boolean {
    return this.gameService.isConnected();
  }

  public connectToServer(playerName: string): void {
    this.socketService.connectToServer(playerName);
  }

  ngOnInit(): void {
    this.socketService.initSocket();
  }

  ngOnDestroy(): void {
    this.socketService.destroySocket();
  }

}
