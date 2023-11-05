import { Component } from '@angular/core';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.scss']
})
export class ManagementHeaderComponent {
  openChatList = false;
  isOpenChatBox = false;
  openChatBox(userID: string){
    this.openChatList = false;
    this.isOpenChatBox = true;
    console.log(userID)
  }
  closeChatBox(isCloseChatBox: boolean){
    this.isOpenChatBox = !isCloseChatBox;
  }
}
