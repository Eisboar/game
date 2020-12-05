import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable()
export class ProvidersChatProvider {


  constructor(private socket: Socket) {

  }

  sendChat(message) {
    this.socket.emit('chat', message);
  }

  receiveChat() {
    return this.socket.fromEvent('chat');
  }

  getUsers() {
    return this.socket.fromEvent('users');
  }

}