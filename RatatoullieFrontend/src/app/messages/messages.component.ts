import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  show : boolean;
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }
  
  toggleShow(){
    if (!this.show){
      $('.message_body').toggleClass('message_body_hide');
    }else{
      $('.message_body_hide').toggleClass('message_body');
    }
  }

}
