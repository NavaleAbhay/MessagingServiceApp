import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth.service';
import { Message } from '../../models/message';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
//   messages: Message[] = [];
//   msg: Message = { Sender: '', Receiver: '', Text: '' };

//   constructor(private ws: WebsocketService, private auth: AuthService) {}

//   ngOnInit() {
//     const token = this.auth.getToken();
//     if(token != null)
//     {
//     const decoded: any = jwtDecode(token);
//     const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
//     this.msg.Sender = username;

//     this.ws.connect(token);
//     this.ws.onMessage((m) => this.messages.push(m));
//   }
// }

//   sendMessage() {
//     debugger;
//     this.msg.Timestamp = new Date().toISOString();
//     this.ws.send({ ...this.msg });
//     this.msg.Text = '';
//   }


//node 


messages: Message[] = [];
msg: Message = { Sender: '', Receiver: '', Text: '' };

constructor(private ws: WebsocketService, private auth: AuthService) {}

ngOnInit() {
  debugger;
  const token = this.auth.getToken();
  if (token) {
    const decoded: any = jwtDecode(token);
    const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.username;
    this.msg.Sender = username;

    this.ws.connect(token);
    this.ws.messages$.subscribe((m) => this.messages = m);
  }
}

sendMessage() {
  this.msg.Timestamp = new Date().toISOString();
  this.ws.sendMessage({ ...this.msg });
  this.msg.Text = '';
}
}
