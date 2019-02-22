import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {Observable, Subject, merge, of } from 'rxjs';
import {debounceTime, map, mergeMap, scan, tap} from 'rxjs/operators';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {Post} from 'src/app/model/post.model';
import {Profile} from 'src/app/model/profile.model';
import {UserPostsService} from 'src/app/services/user-post.service';

import {ContactsService} from '../contacts/contacts.service';
import {User} from '../users/user.model';

import {ProfileService} from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  profile: Profile;
  contactsMap;
  isFriend = false;
  @ViewChild(IonContent) content: IonContent;
  disabledInfiniteScroll = true;
  account: Account;
  // set default sort
  defaultfilter: IFilter = {
    field: 'creationDate',
    sort: SortType.DESC,
  };
  filter: IFilter = this.defaultfilter;
  filterKeys: string[] = ['creationDate'];

  // map the scrolling down as a strem
  scrols = new Subject<Event>();
  listeningOnchange$: Observable<Post[]>;
  list$: Observable<Post[]>;


  constructor(
      private contactsService: ContactsService,
      public userPostsService: UserPostsService,
      public profileService: ProfileService,
      public activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.contactsService.query(false, {pageSize: 10000}).subscribe(data => {
      this.contactsMap = data.reduce(function(map, obj) {
        map[obj.email] = obj;
        return map;
      }, {});
    });
  }
  pageWillEnter() {
    this.activatedRoute.data.subscribe((data) => {
      this.user = data.user;
      this.profile = data.profile;
      this.isFriend = this.contactsMap[data.user.email] ? true : false;
      console.log('data received', data);
      this.userPostsService.setUrl(this.user.getUserPosts());
      const makeOf = (t) => of (t);

      // get first page of data
      const firstPage = this.userPostsService.query(false, this.filter)
      tap(t => console.log('First page loaded.'));

      // map the data fetched on scroll as streem
      const scrols$ = this.scrols.asObservable().pipe(

          debounceTime(500),

          tap(t => console.log('Streamed scroll emitted.')),

          mergeMap(
              event => this.userPostsService.query(true, this.filter)
                           .pipe(map(list => ({event, list})))),

          // disable lint for data.event.target.complete()
          // @ts-ignore
          tap(data => data.event ? data.event.target.complete() : null),

          map(data => data.list),

          );


      firstPage
          .subscribe(_ => {
            // after first page start listner on update
            this.listeningOnchange$ =
                this.userPostsService.onSnapshot(true, this.filter)
                    .pipe(

                        mergeMap(t => makeOf(t)),

                        scan<Post>((all, cur) => [cur, ...all], []),

                        map(t => t.sort(
                                (a, b) => b.creationDate.seconds -
                                    a.creationDate.seconds)),
                        tap(list =>
                                console.log('onChange handler finished.')), );

          })


              this.list$ =
          merge(firstPage, scrols$)
              .pipe(
                  scan<Post[]>((all, cur) => [...all, ...cur]),

                  tap(list => console.log('Merged list observable emitted.')),

                  tap(list => list.sort(
                          (a, b) =>
                              b.creationDate.seconds - a.creationDate.seconds)),

                  tap(list => this.disabledInfiniteScroll = list.length <= 0));
    });
  }
  emitScroll(event) { this.scrols.next(event); }
}
