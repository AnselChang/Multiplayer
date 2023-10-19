import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SvgService } from './svg.service';
import { SocketService } from './socket.service';
import { GameStateService } from './game-state.service';
import { throttle } from 'scripts/throttle';
import { DirectionalPlayerInputMessage } from 'shared/client-to-server/message';

// Handles (throttled) mouse movement and keyboard events. processes them as game input
// and sends them to server via socket service to update game state

@Injectable({
  providedIn: 'root'
})
export class InputPollingService {



  constructor(
    private gameStateService: GameStateService,
    private svgService: SvgService,
    private socketService: SocketService) {
  }

  private onMouseMove() {

    // calculate mouse position relative to player position
    const mousePos = this.svgService.getMousePosition();
    const playerPos = this.gameStateService.getGame().getMe().getPosition();

    // calculate offsets
    const dx = this.svgService.scalarToPixels(mousePos.x - playerPos.x);
    const dy = this.svgService.scalarToPixels(mousePos.y - playerPos.y);
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const direction = Math.atan2(dy, dx);

    console.log('magnitude', magnitude);

    // Send message to server via socket service
    const message = new DirectionalPlayerInputMessage(direction, magnitude);
    this.socketService.sendMessageToServer(message);

  }

  public throttledOnMouseMove = throttle(this.onMouseMove, 100);

  public onKeyDown(key: string) {

  }

}
