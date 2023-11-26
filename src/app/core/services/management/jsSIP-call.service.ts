import { Injectable } from '@angular/core';
import * as JsSIP from 'jssip';
@Injectable({
  providedIn: 'root'
})
export class JsSIPCallService {
  private socket: JsSIP.WebSocketInterface;
  private ua: JsSIP.UA;

  register() {
    this.ua.start();
  }

  call(phoneNumber: string){
    this.ua.start();
    this.ua.register();
    const options = {
      mediaConstraints: { audio: true, video: false },
      pcConfig: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      }
    };
    const session = this.ua.call(`sip:${phoneNumber}`, options);
    // Handle session events (optional)

    session.on('connecting', () => {
      console.log('Connecting...');
    });
    session.on('failed', (e) => {
      console.error('Call failed:', e);
    });
    // Add more session event handlers as needed
  }

  constructor() {
    this.socket = new JsSIP.WebSocketInterface('wss://gc03-pbx.tel4vn.com:7444');
    const configuration = {
      ws_servers: 'wss://gc03-pbx.tel4vn.com:7444',
      uri      : 'sip:102@2-test1.gcalls.vn:50061',
      password : 'test1102',
      sockets  : [ this.socket ]

    };
    this.ua = new JsSIP.UA(configuration);
   }
}
