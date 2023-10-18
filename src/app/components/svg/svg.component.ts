import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';

/*
Handles the entire playable area as an SVG element. Uses svg-pan-zoom library
to handle zooming and panning the playfield.
*/

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {
  @Input() game!: Game;


  constructor() { }

  public getGameWidth(): number {
    return this.game.getGameWidth();
  }

  public getGameHeight(): number {
    return this.game.getGameHeight();
  }

  public getPlayers(): Player[] {
    return this.game.getPlayers();
  }
  

}
