import 'firebase/firestore';

import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable, Subject, from, of } from 'rxjs';
import {PostComment} from 'src/app/model/post-comment.model';
import {RestService} from 'src/app/services/rest.service';

@Injectable()
export class PostCommentsService {
  getPostCommentUrl = (id: string) => `posts/${id}/comments`;
  create(postId: string, postComment: PostComment): Observable<PostComment> {
    const db = firebase.firestore();
    const url = this.getPostCommentUrl(postId);
    if (url) {
      var refDoc = db.collection(url).doc();
      const now = firebase.firestore.FieldValue.serverTimestamp();
      // add the follow property
      postComment['creationDate'] = now;
      postComment['uid'] = refDoc.id;
      console.log('Request for creare:', postComment);
      const data = Object.assign({}, postComment);
      return from(refDoc.set(data).then(() => postComment));
    } else {
      return null;
    }
  }
  // listen for realtime update
  onSnapshot(postId: string): Observable<PostComment> {
    const db = firebase.firestore();
    const url = this.getPostCommentUrl(postId);
    if (!url) {
      return of (null);
    } else {
      let listRef = db.collection(url);
      return Observable.create(subscriber => {
        listRef.onSnapshot((querySnapshot) => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              subscriber.next(change.doc.data());
            }
          });
        });
      });
    }
  }
}
