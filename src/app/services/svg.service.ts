import { Injectable } from '@angular/core';
import { GameStateService } from './game-state.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private VIEW_RADIUS: number = 100;
  private svg!: SVGSVGElement;

  // Mouse position in SVG coordinates
  private mouseX: number = 0;
  private mouseY: number = 0;

  private renderedWidth: number = 0;
  private renderedHeight: number = 0;

  // when svg viewbo changes, notify subscribers
  public onUpdate$ = new Subject<void>();



  constructor(private gameStateService: GameStateService) {
    this.gameStateService.onUpdate$.subscribe(() => {
      this.onUpdate$.next();
    });
  }

  public initSVGElement(svg: SVGSVGElement): void {
    this.svg = svg;
    this.onUpdate$.next();
    console.log("SVG element initialized", svg, typeof svg);
  }


  public screenToSVGCoodinates(x: number, y: number): { x: number, y: number } {

    const point = this.svg.createSVGPoint();
    point.x = x;
    point.y = y;
    const svgPoint = point.matrixTransform(this.svg.getScreenCTM()!.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  }

  updateRenderedDimensions(renderedWidth: number, renderedHeight: number): void {
    this.renderedWidth = renderedWidth;
    this.renderedHeight = renderedHeight;
    console.log('renderedWidth, renderedHeight', renderedWidth, renderedHeight);
  }

  public scalarToSVG(scalarInPixels: number): number {
    return scalarInPixels * this.renderedWidth / this.VIEW_RADIUS;
  }

  public scalarToPixels(scalarInSVG: number): number {
    return scalarInSVG * this.VIEW_RADIUS / this.renderedWidth;
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
