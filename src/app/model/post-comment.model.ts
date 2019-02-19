import {IUser} from '../pages/users/user.model';

export interface IPostComment extends IUser {
  text?: string;
  creationDate?: any;
}

export class PostComment implements IPostComment {
  constructor(
      public uid?: string, public displayName?: string, public email?: string,
      public photoURL?: string, public text?: string,
      public creationDate?: any, ) {}
}