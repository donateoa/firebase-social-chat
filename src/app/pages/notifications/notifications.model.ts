import {IUser} from '../users/user.model';

export interface INotification {
  uid?: string;
  userFrom?: IUser;
  type?: string;
  creationDate?: any;
}

export class Notification implements INotification {
  constructor(
      public uid?: string, serFrom?: IUser, type?: string, creationDate?: any) {
  }
}