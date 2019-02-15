export interface IUser { id?: string; }

export class User implements IUser {
  constructor(public id?: string) {}
}