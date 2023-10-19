import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Player } from 'src/app/models/player';
import { throttle } from 'scripts/throttle';
import { SvgService } from 'src/app/services/svg.service';
import { InputPollingService } from 'src/app/services/input-polling.service';

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

  constructor(private svgService: SvgService, private inputPollingService: InputPollingService) { }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    this.svgService.initSVGElement(this.svg.nativeElement);
    this.updateRenderedDimensions();
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
    this.inputPollingService.throttledOnMouseMove();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log("Keydown", event.key);
    this.inputPollingService.onKeyDown(event.key);
  }

  @HostListener('window:resize', ['$event'])
  updateRenderedDimensions() {
    const width = this.svg.nativeElement.clientWidth;
    const height = this.svg.nativeElement.clientHeight;
    this.svgService.updateRenderedDimensions(width, height);
  }

  
  

}
