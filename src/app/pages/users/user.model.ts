export interface IUser {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export class User implements IUser {
  constructor(
      public uid?: string, public displayName?: string, public email?: string,
      public photoURL?: string) {}
  getContacts() { return `contacts/${this.email}/list`; }
  getBacheca() { return `bacheca/${this.email}/list`; }
  getUserPosts() { return `user-posts/${this.email}/list`; }
  getChats() { return `chats/${this.email}/list`; }
  getContactNotificationsList() {
    return `${this.getNotificationsDocument()}/contacts-request`;
  }
  getNotificationsDocument() { return `notifications/${this.email}`; }
}