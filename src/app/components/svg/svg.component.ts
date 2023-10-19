import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { throttle } from 'scripts/throttle';

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
  @Input() myself!: Player;

  private WINDOW_WIDTH!: number;
  private WINDOW_HEIGHT!: number;

  constructor(private elRef: ElementRef) { }

  public getGameWidth(): number {
    return this.game.getGameWidth();
  }

  public getGameHeight(): number {
    return this.game.getGameHeight();
  }

  public getPlayers(): Player[] {
    return this.game.getPlayers();
  }


  public getViewBox(): string {

    const centerX = this.myself.x;
    const centerY = this.myself.y;
    const radius = 100;

    const minX = centerX - radius;
    const minY = centerY - radius;
    const width = radius * 2;
    const height = radius * 2;
    const str = `${minX} ${minY} ${width} ${height}`
    return str;

  };
  

}
