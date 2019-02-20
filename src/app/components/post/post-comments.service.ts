import 'firebase/firestore';

import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable, Subject, from, of } from 'rxjs';
import {PostComment} from 'src/app/model/post-comment.model';
import {RestService} from 'src/app/services/rest.service';

@Injectable()
export class PostCommentsService {
  list: PostComment[];

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
  onSnapshot(postId: string): Observable<PostComment[]> {
    const db = firebase.firestore();
    const url = this.getPostCommentUrl(postId);
    const that = this;
    this.list = [];
    console.log('Listen  onSnapshotfor url:', url);
    if (!url) {
      return of (null);
    } else {
      let listRef = db.collection(url);
      const subject: Subject<PostComment[]> = new Subject();

      listRef.onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            that.list.push(change.doc.data());
          }
        });
        subject.next(that.list);
      });
      return subject.asObservable();
    }
  }
}
