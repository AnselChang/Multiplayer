import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-grid-lines]',
  templateUrl: './grid-lines.component.html',
  styleUrls: ['./grid-lines.component.scss']
})
export class GridLinesComponent implements OnInit {
  @Input() minX!: number;
  @Input() maxX!: number;
  @Input() minY!: number;
  @Input() maxY!: number;
  @Input() step!: number;

  Math = Math; // make Math available to the template

  ngOnInit(): void {

  }

}
