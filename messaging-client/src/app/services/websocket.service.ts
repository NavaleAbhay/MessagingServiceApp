import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private socket!: WebSocket;

  // connect(token: string) {
  //   this.socket = new WebSocket(`ws://localhost:5279/ws?access_token=${token}`);
  // }

  // send(msg: Message) {
  //  // this.socket.send(JSON.stringify(msg));
  //   if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  //     this.socket.send(JSON.stringify(msg));
  //   } else {
  //     console.error('WebSocket is not open (state:', this.socket?.readyState, '). Cannot send message.');
  //   } 
  // }

  // onMessage(handler: (msg: Message) => void) {
  //   this.socket.onmessage = (event) => {
  //     handler(JSON.parse(event.data));
  //   };
  // }


  // node communication 


  private socket!: Socket;
  private messagesSubject = new BehaviorSubject<Message[]>([]);

  public messages$ = this.messagesSubject.asObservable();

  connect(token: string): void {
    this.socket = io('http://localhost:5000', {
      auth: { token }
    });

    this.socket.on('message', (msg: Message) => {
      const current = this.messagesSubject.value;
      this.messagesSubject.next([...current, msg]);
    });
  }

  sendMessage(msg: Message): void {
    debugger;
    this.socket.emit('message', msg);
  }
}

