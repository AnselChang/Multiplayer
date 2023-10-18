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

  constructor(private gameStateService: GameStateService, private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.initSocket();
  }

  public isConnectedToServer(): boolean {
    return this.gameStateService.isConnected();
  }

  ngOnDestroy(): void {
    this.socketService.destroySocket();
  }

}
