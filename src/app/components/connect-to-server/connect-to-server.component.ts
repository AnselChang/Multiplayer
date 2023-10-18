import { Component } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-connect-to-server',
  templateUrl: './connect-to-server.component.html',
  styleUrls: ['./connect-to-server.component.scss']
})
export class ConnectToServerComponent {

  public playerName: string = "Unnamed Player";

  constructor(private socketService: SocketService) { }

  public connectToServer(): void {
    this.socketService.connectToServer(this.playerName);
  }

}
