import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { WebsocketService } from '../services/websocket.service';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ChatModule { }
