import { Injectable } from '@angular/core';
import { GameState } from 'shared/server-to-client/game-state';
import { Game } from '../models/game';
import { Subject } from 'rxjs';

export enum UpdateType {
  GAME_STATE
};

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private _game: Game = new Game();
  private _isConnected: boolean = false;

  public onUpdate$ = new Subject<UpdateType>();

  public syncGameStateFromServer(state: GameState) {
    this._game.syncWithServer(state);
    this._isConnected = true;
    this.onUpdate$.next(UpdateType.GAME_STATE);
  }

  public getGame(): Game {
    return this._game;
  }

  public isConnected(): boolean {
    return this._isConnected;
  }

}
