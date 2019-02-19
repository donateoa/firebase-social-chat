import {Component, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {combineLatest} from 'rxjs';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {IPost} from 'src/app/model/post.model';
import {PostService} from 'src/app/posts/post.service';

import {BachecaService} from './bacheca.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
      private bachecaService: BachecaService) {}

  ngOnInit() {}
  changeFilter(criteria) {
    if (criteria.filter) {
      this.filter = criteria.filter;
    } else {
      this.filter = this.defaultfilter;
    }
    this.transition();
  }

  pageWillEnter() {
    this.transition();
    this.bachecaService.onSnapshot().subscribe(
        t => this.list = [...t.map(t => t.id), ...this.list]);
  }
  transition() { this.loadPage(false); }
  getItemsByIds(itemsIds: any[]) {
    return combineLatest(itemsIds.map(id => this.postService.find(id)));
  }
  loadPage(append) {
    this.bachecaService.query(append, this.filter).subscribe(data => {
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
