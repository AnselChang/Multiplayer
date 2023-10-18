import { AfterViewInit, Component, ElementRef, HostListener, Input } from '@angular/core';
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
export class SvgComponent implements AfterViewInit {
  @Input() game!: Game;
  @Input() myself!: Player;

  private WINDOW_WIDTH!: number;
  private WINDOW_HEIGHT!: number;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.updateWindowDimensions();
  }


  public getGameWidth(): number {
    return this.game.getGameWidth();
  }

  public getGameHeight(): number {
    return this.game.getGameHeight();
  }

  public getPlayers(): Player[] {
    return this.game.getPlayers();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.updateWindowDimensions();
    }

  updateWindowDimensions() {
    this.WINDOW_WIDTH = this.elRef.nativeElement.clientWidth;
    this.WINDOW_HEIGHT = this.elRef.nativeElement.clientHeight;
    console.log(`Window dimensions: ${this.WINDOW_WIDTH} x ${this.WINDOW_HEIGHT}`);
    
}

  public getTransform(): string {

    const offsetX = (this.WINDOW_WIDTH / 2) - this.myself.x;
    const offsetY = (this.WINDOW_HEIGHT / 2) - this.myself.y;
    const zoomLevel = 1;

    return `translate(${0}, ${0}) scale(${zoomLevel})`;

  };
  

}
