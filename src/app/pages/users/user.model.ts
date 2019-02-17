export interface IUser {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export class User implements IUser {
  constructor(
      public uid?: string, displayName?: string, email?: string,
      photoURL?: string) {}
}