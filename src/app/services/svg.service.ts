import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private VIEW_RADIUS: number = 100;
  private svg!: SVGSVGElement;

  // Mouse position in SVG coordinates
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private gameStateService: GameStateService) { }

  public initSVGElement(svg: SVGSVGElement): void {
    this.svg = svg;
  }


  public screenToSVGCoodinates(x: number, y: number): { x: number, y: number } {

    const point = this.svg.createSVGPoint();
    point.x = x;
    point.y = y;
    const svgPoint = point.matrixTransform(this.svg.getScreenCTM()!.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  }

  public updateMousePosition(rawMouseX: number, rawMouseY: number): void {
    const newMousePos = this.screenToSVGCoodinates(rawMouseX, rawMouseY);
    this.mouseX = newMousePos.x;
    this.mouseY = newMousePos.y;
  }

  // Returns the mouse position in SVG coordinates
  public getMousePosition(): { x: number, y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }

  public getViewBox(): string {

    const myself = this.gameStateService.getGame().getMe();

    const centerX = myself.x;
    const centerY = myself.y;

    const minX = centerX - this.VIEW_RADIUS;
    const minY = centerY - this.VIEW_RADIUS;
    const width = this.VIEW_RADIUS * 2;
    const height = this.VIEW_RADIUS * 2;
    const str = `${minX} ${minY} ${width} ${height}`
    return str;

  };
}
