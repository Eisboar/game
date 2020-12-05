import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatRoomPageRoutingModule } from './chat-room-routing.module';

import { ChatRoomPage } from './chat-room.page';

const routes: Routes = [
  { path: ':nickname', component: ChatRoomPage }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoomPageRoutingModule
  ],
  declarations: [ChatRoomPage]
})
export class ChatRoomPageModule { }
