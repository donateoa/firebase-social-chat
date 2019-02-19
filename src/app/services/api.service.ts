import 'firebase/functions'

import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';

import {IPost} from '../posts/post.model';

@Injectable({providedIn: 'root'})
export class ApiService {
  constructor() {}

  addPost(post: IPost) {
    const firebaseFunction = firebase.functions().httpsCallable('createPost');
    return firebaseFunction(post);
  }
}
