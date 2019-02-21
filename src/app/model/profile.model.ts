
export interface IProfile {
  uid?: string, text?: string;
  creationDate?: any;
}

export class Profile implements IProfile {
  constructor(
      public uid?: string, public text?: string, public creationDate?: any) {}
}