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
  comment: string;
  @Input()
  set postId(postId: any) {
    this._postId = postId;
    this.post$ = this.postService.find(this._postId)
  }
  get postId(){return this._postId};

  constructor(private postService: PostService) {}
  ngOnInit(): void {}
  addComment() {
    console.log(this.comment);
    this.comment = '';
  }
  onKey(event: any) {
    if (event.which === 13) {
      this.addComment();
    }
    event.preventDefault();
  }
}
