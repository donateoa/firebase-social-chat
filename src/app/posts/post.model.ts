export interface IPost {
  title?: string;
  text?: string;
  media?: string;
  creationDate?: any;
}

export class Post implements IPost {
  constructor(
      public title?: string, public text?: string, public media?: string,
      public creationDate?: any, ) {}
}