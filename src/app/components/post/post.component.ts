import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonButton} from '@ionic/angular';
import {Observable, Subject, combineLatest, fromEvent} from 'rxjs';
import {map, scan, startWith} from 'rxjs/operators';
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
  comments$: Observable<PostComment[]>;
  // handle toogle button show/hide more detail
  clicks = new Subject<Event>();
  toggleState = currentState => !currentState;
  buttonInitialState = false;

  clicks$ = this.clicks.asObservable()
                .pipe(scan(this.toggleState, this.buttonInitialState))
                .pipe(startWith(this.buttonInitialState));

  // define a stream with combineLatest to show more or less comments
  list$: Observable<PostComment[]>;

  @Input()
  set postId(postId: any) {
    this._postId = postId;
    this.post$ = this.postService.find(this._postId);
    this.comments$ = this.postCommentsService.onSnapshot(this._postId)
                         .pipe(map(
                             comments => comments.sort(
                                 (a, b) => a.creationDate - b.creationDate)));
    this.list$ = combineLatest(this.comments$, this.clicks$)
                     .pipe(map(
                         ([comments, toggleState]) =>
                             (toggleState ? comments : comments.slice(-3))));
  }
  get postId(){return this._postId};

  constructor(
      private postService: PostService,
      private postCommentsService: PostCommentsService,
      private principal: Principal) {}
  ngOnInit(): void {}

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
