import {Component, Input, OnInit,} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Observable, Subject, combineLatest, of } from 'rxjs';
import {map, mergeMap, scan, startWith} from 'rxjs/operators';
import {PostComment} from 'src/app/model/post-comment.model';
import {Post} from 'src/app/model/post.model';
import {MediaDetailPage} from 'src/app/pages/media-detail/media-detail.page';
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
      public modalController: ModalController, private postService: PostService,
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
  async navigateToMedia(media: string) {
    const modal = await this.modalController.create(
        {component: MediaDetailPage, componentProps: {'media': media}});
    return await modal.present();
  }
}
