import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'message-content.html'
})

export class MessageContent implements OnInit{
    data;
    messageList = [];

  ngOnInit(): void {

    this.messageList = this.messageList.concat(this.data.title,this.data.message);
    console.log(this.messageList);
  }
}
