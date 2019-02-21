import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonButton} from '@ionic/angular';
import {delay} from 'q';
import {Observable, Subject, combineLatest, fromEvent, interval, of } from 'rxjs';
import {concatMap, flatMap, map, mergeMap, scan, startWith, tap} from 'rxjs/operators';
import {PostComment} from 'src/app/model/post-comment.model';
import {Post} from 'src/app/model/post.model';
import {Principal} from 'src/app/services/Principal';
import {PostService} from 'src/app/services/post.service';

import {PostCommentsService} from './post-comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input('postId') _postId: string;

  post$: Observable<Post>;
  comment: string;
  comments: PostComment[];
  // handle toogle button show/hide more detail
  clicks = new Subject<Event>();
  showToogleButton$: Observable<Boolean>;
  toggleState = currentState => !currentState;
  buttonInitialState = false;

  clicks$ = this.clicks.asObservable().pipe(
      scan(this.toggleState, this.buttonInitialState),
      startWith(this.buttonInitialState));

  // define a stream with combineLatest to show more or less comments
  list$: Observable<PostComment[]>;
  incomingData$: Observable<any>;

  @Input()
  set postId(postId: any) { this._postId = postId; }
  get postId(){return this._postId};

  constructor(
      private postService: PostService,
      private postCommentsService: PostCommentsService,
      private principal: Principal) {}
  ngOnInit(): void {
    this.post$ = this.postService.find(this._postId);
    this.comments = [];
    //
    const makeOf = (t) => of (t);
    this.incomingData$ =
        this.postCommentsService.onSnapshot(this._postId)
            .pipe(
                mergeMap(t => makeOf(t)),
                scan<PostComment>((all, cur) => [...all, cur], []),
                map(t => t.sort((a, b) => a.creationDate - b.creationDate)));
    this.showToogleButton$ = this.incomingData$.pipe(map(t => t.length > 3));

    this.list$ = combineLatest(this.incomingData$, this.clicks$)
                     .pipe(map(
                         ([comments, toggleState]) =>
                             (toggleState ? comments : comments.slice(-3))));
  }

  toggleCommentClick(event: Event) { this.clicks.next(event); }
  addComment() {
    const data: PostComment =
        Object.assign(this.principal.identity(), {text: this.comment});
    this.postCommentsService.create(this.postId, data);
    this.comment = '';
  }
  onKey(event: any) {
    if (event.which === 13) {
      this.addComment();
    }
    event.preventDefault();
  }
}
