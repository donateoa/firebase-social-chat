import 'firebase/functions'

import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {IPost} from 'src/app/model/post.model';

import {IMessage} from '../pages/chat/message.model';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor() {}

  addPost(post: IPost) {
    const firebaseFunction = firebase.functions().httpsCallable('createPost');
    return firebaseFunction(post);
  }
  sendMessage(data: IMessage) {
    const firebaseFunction =
        firebase.functions().httpsCallable('sendMessageToUser');
    return firebaseFunction(data);
  }
}
