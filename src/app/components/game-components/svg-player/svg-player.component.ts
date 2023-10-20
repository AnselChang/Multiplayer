import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: '[app-svg-player]',
  templateUrl: './svg-player.component.html',
  styleUrls: ['./svg-player.component.scss']
})
export class SvgPlayerComponent {
  @Input() player!: Player;

  constructor() { }

  public getName(): string {
    return this.player.name;
  }

  public getX(): number {
    return this.player.x;
  }

  public getY(): number {
    return this.player.y;
  }

  public getRadius(): number {
    return this.player.size;
  }
  
  public getStrokeWidth(): number {
    return 2;
  }

}
