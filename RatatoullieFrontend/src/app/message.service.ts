import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  maxSize: number = 3; // Max size for the messages, then it will delte the oldest

  constructor() { }

  add(message: string) {
    if(this.messages.length == this.maxSize) // I must delete the oldest message
      this.messages.splice(0,1); // From the position 0 removes 1 element
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
}
