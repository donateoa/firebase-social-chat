import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {combineLatest} from 'rxjs';

import {IFilter, SortType} from '../components/entity-filter/entity-filter.model';
import {RestService} from '../services/rest.service';

import {IPost} from './post.model';
import {PostService} from './post.service';
import {UserPostsService} from './user-post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  list: IPost[];
  disabledInfiniteScroll = true;
  account: Account;
  // set default sort
  defaultfilter: IFilter = {
    field: 'creationDate',
    sort: SortType.ASC,
  };
  filter: IFilter = this.defaultfilter;
  filterKeys: string[] = ['creationDate'];
  constructor(
      private postService: PostService,
      private userPostsService: UserPostsService) {}

  ngOnInit() {}
  changeFilter(criteria) {
    if (criteria.filter) {
      this.filter = criteria.filter;
    } else {
      this.filter = this.defaultfilter;
    }
    this.transition();
  }

  pageWillEnter() { this.transition(); }
  transition() { this.loadPage(false); }

  loadPage(append) {
    this.userPostsService.query(append, this.filter).subscribe(data => {
      console.log(data);
      if (data.length <= 0) {
        // disable infinite-scroll when data are fineshed
        this.disabledInfiniteScroll = true;
        // disable loading if present
        if (!this.list) {
          this.list = [];
        }
      } else {
        if (!append) {
          this.list = [];
        }
        this.list = [...this.list, ...data.map(t => t.id)];
        this.disabledInfiniteScroll = false;
      }
    });
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.loadPage(true);
    }, 500);
  }
}
