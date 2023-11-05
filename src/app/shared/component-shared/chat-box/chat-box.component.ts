import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, ElementRef, Renderer2, AfterViewInit, Output, EventEmitter, AfterViewChecked  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
export const pluginsModules = [
  CommonModule,
  RouterModule,
  MatIconModule,
  FormsModule
];
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone: true,
  imports: pluginsModules
})
export class ChatBoxComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @Output() closeChatBox = new EventEmitter<boolean>();
  messageInput: string = '';
  ngOnInit(): void {
    this.scrollToBottom();
  }

  messages = [
    {
      userID:'1',
      message: 'hiasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
    },
    {
      userID:'2',
      message: 'hi'
    },
    {
      userID:'2',
      message: 'hi'
    },
    {
      userID:'1',
      message: 'hi'
    }
  ];
  chatData = {
    freindID: '1',
    avatar: 'assets/img/avt.jpg',
    messages: this.messages,
  }
  constructor(private renderer: Renderer2) {}
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  addMessage(): void {
    this.messages.push({
      userID: '2',
      message: this.messageInput
    });
    this.messageInput = ''
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.renderer.setProperty(
        this.messageContainer.nativeElement,
        'scrollTop',
        this.messageContainer.nativeElement.scrollHeight
      );
    } catch (error) {
      console.error(error);
    }
  }
  toggleChatBox() {
    this.closeChatBox.emit(true);
  }
}
