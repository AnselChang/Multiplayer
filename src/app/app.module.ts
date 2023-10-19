import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SvgComponent } from './components/svg/svg.component';
import { GridLinesComponent } from './components/grid-lines/grid-lines.component';
import { ConnectToServerComponent } from './components/connect-to-server/connect-to-server.component';
import { SvgPlayerComponent } from './components/game-components/svg-player/svg-player.component';
import { MouseIndicatorComponent } from './components/game-components/mouse-indicator/mouse-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    GridLinesComponent,
    ConnectToServerComponent,
    SvgPlayerComponent,
    MouseIndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
