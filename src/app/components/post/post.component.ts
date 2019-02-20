import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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
  @Input()
  set postId(postId: any) {
    this._postId = postId;
    this.post$ = this.postService.find(this._postId);
    this.comments$ = this.postCommentsService.onSnapshot(this._postId);
  }
  get postId(){return this._postId};

  constructor(
      private postService: PostService,
      private postCommentsService: PostCommentsService,
      private principal: Principal) {}
  ngOnInit(): void {}
  addComment() {
    console.log(this.comment);
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
