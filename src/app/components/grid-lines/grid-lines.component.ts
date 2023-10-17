import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-grid-lines]',
  templateUrl: './grid-lines.component.html',
  styleUrls: ['./grid-lines.component.scss']
})
export class GridLinesComponent implements OnInit {
  @Input() width = 500;       // default width of the SVG
  @Input() height = 500;      // default height of the SVG
  @Input() granularity = 30;  // distance between grid lines

  Math = Math; // make Math available to the template

  ngOnInit(): void {

  }

}
