
export interface IMessage {
  uid?: string;
  text?: string;
  media?: string;
}

export class Message implements IMessage {
  constructor(uid?: string, text?: string, media?: string) {}
}