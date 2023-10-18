import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { SocketService } from './services/socket.service';
import { GameStateService } from './services/game-state.service';
import { Game } from './models/game';
import { Player } from './models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'multiplayer';

  constructor(private gameStateService: GameStateService,
    private socketService: SocketService,
    private ngZone: NgZone) {}

  ngOnInit(): void {
    this.socketService.initSocket();
    this.ngZone.runOutsideAngular(() => {
      this.addEventListeners();
    });
  }

  public isConnectedToServer(): boolean {
    return this.gameStateService.isConnected();
  }

  public getGame(): Game {
    return this.gameStateService.getGame();
  }

  public getMyself(): Player {
    return this.getGame().getMe();
  }

  ngOnDestroy(): void {
    this.socketService.destroySocket();

    document.removeEventListener('wheel', this.preventZoom);
    document.removeEventListener('touchmove', this.preventScroll);
    window.removeEventListener('scroll', this.preventElasticScroll);
  }

  addEventListeners() {
    // Disable pinch zooming
    document.addEventListener('wheel', this.preventZoom, { passive: false });

    // Disable scrolling using touch
    document.addEventListener('touchmove', this.preventScroll, { passive: false });

    // Disable elastic scrolling on macOS
    window.addEventListener('scroll', this.preventElasticScroll);
  }

  preventZoom(e: WheelEvent) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }

  preventScroll(e: TouchEvent) {
    e.preventDefault();
  }

  preventElasticScroll() {
    window.scrollTo(0, 0);
  }


}
