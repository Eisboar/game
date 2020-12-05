import { Component, OnInit } from '@angular/core';
import { ProvidersChatProvider } from '../../providers/providers-chat/providers-chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];

  constructor(private chatService: ProvidersChatProvider) {

  }

  ngOnInit() {

    this.chatService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
    });

  }

  addChat() {
    this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message = '';
  }

}
