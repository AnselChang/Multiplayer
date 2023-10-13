import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'multiplayer';

  private socket!: Socket;
  public inputValue: string = "";

  ngOnInit(): void {

    this.socket = io();  // Connect to the server

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

    this.socket.on('message', (msg: string) => {
      console.log('message received: ' + msg);
    });
      
  }

  send(): void {
    console.log("Sending", this.inputValue);
    this.socket.emit('message', this.inputValue);
    this.inputValue = "";
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from the server');
    }
  }

}
