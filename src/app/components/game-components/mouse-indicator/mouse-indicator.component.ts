import { Component } from '@angular/core';
import { SvgService } from 'src/app/services/svg.service';

@Component({
  selector: '[app-mouse-indicator]',
  templateUrl: './mouse-indicator.component.html',
  styleUrls: ['./mouse-indicator.component.scss']
})
export class MouseIndicatorComponent {


  constructor(private svgService: SvgService) {

  }

  public getX(): number {
    return this.svgService.getMousePosition().x;
  }

  public getY(): number {
    return this.svgService.getMousePosition().y;
  }

  public getRadius(): number {
    return this.svgService.scalarToSVG(0.1);
  }
}
