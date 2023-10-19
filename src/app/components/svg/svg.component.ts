import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { throttle } from 'scripts/throttle';
import { SvgService } from 'src/app/services/svg.service';

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
  @ViewChild('rootSVG') svg!: ElementRef<SVGSVGElement>;

  constructor(private elRef: ElementRef, private svgService: SvgService) { }

  ngAfterViewInit(): void {
    this.svgService.initSVGElement(this.svg.nativeElement);
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

  public getViewBox(): string {
    return this.svgService.getViewBox();
  };

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e: MouseEvent) {
    this.svgService.updateMousePosition(e.clientX, e.clientY);
  }
  

}
