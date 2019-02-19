import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from 'src/app/posts/post.model';
import {PostService} from 'src/app/posts/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input('postId') _postId: string;
  post$: Observable<Post>;

  @Input()
  set postId(postId: any) {
    this._postId = postId;
    this.post$ = this.postService.find(this._postId)
  }
  get postId(){return this._postId};

  constructor(private postService: PostService) {}
  ngOnInit(): void {}
}
