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

  getContacts() {
    const m = `contacts/${this.email}/list`;
    console.log(m);
    return m;
  }
  getBacheca() {
    const m = `bacheca/${this.email}/list`;
    console.log(m);
    return m;
  }
  getUserPosts() {
    const m = `user-posts/${this.email}/list`;
    console.log(m);
    return m;
  }
  getChats() {
    const m = `chats/${this.email}/list`;
    console.log(m);
    return m;
  }
  getContactNotificationsList() {
    const m = `${this.getNotificationsDocument()}/contacts-request`;
    console.log(m);
    return m;
  }
  getNotificationsDocument() {
    const m = `notifications/${this.email}`;
    console.log(m);
    return m;
  }
}