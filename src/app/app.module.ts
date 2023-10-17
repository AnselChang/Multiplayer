import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SvgComponent } from './components/svg/svg.component';
import { GridLinesComponent } from './components/grid-lines/grid-lines.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    GridLinesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
