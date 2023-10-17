import { Component } from '@angular/core';

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

  public readonly GAME_WIDTH = 1000;
  public readonly GAME_HEIGHT = 1000;
  

}
