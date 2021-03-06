import {IUser} from '../pages/users/user.model';

export interface IPost extends IUser {
  text?: string;
  media?: string;
  creationDate?: any;
}

export class Post implements IPost {
  constructor(
      public uid?: string, public displayName?: string, public email?: string,
      public photoURL?: string, public text?: string, public media?: string,
      public creationDate?: any, ) {}
}