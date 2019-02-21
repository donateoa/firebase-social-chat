
export interface IProfile {
  text?: string;
  creationDate?: any;
}

export class Profile implements IProfile {
  constructor(public text?: string, public creationDate?: any) {}
}