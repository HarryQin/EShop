type messageType = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFORMATIONAL';

export class MessageDTO {
  public msgType: messageType;
  public msgText: string;

  constructor(msg: string, type?: messageType) {
    this.msgText = msg;
    if (type) {
      this.msgType = type;
    } else {
      this.msgType = 'SUCCESS';
    }
  }

}

