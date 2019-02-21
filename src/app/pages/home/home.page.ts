import {Component, ViewChild} from '@angular/core';
import {IonContent} from '@ionic/angular';
import {Observable, Subject, merge, of } from 'rxjs';
import {debounceTime, map, mergeMap, scan, tap} from 'rxjs/operators';
import {IFilter, SortType} from 'src/app/components/entity-filter/entity-filter.model';
import {Post} from 'src/app/model/post.model';

import {BachecaService} from './bacheca.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

  constructor(private bachecaService: BachecaService) {}

  ngOnInit() {}
  changeFilter(criteria) {
    if (criteria.filter) {
      this.filter = criteria.filter;
    } else {
      this.filter = this.defaultfilter;
    }
    this.emitScroll(null);
  }

  pageWillEnter() {
    const makeOf = (t) => of (t);

    // get first page of data
    const firstPage = this.bachecaService.query(false, this.filter)
    tap(t => console.log('first page loaded', t));

    // map the data fetched on scroll as streem
    const scrols$ = this.scrols.asObservable().pipe(

        debounceTime(500),

        tap(t => console.log('streamed scroll', t)),

        mergeMap(
            event => this.bachecaService.query(true, this.filter)
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
              this.bachecaService.onSnapshot(true, this.filter)
                  .pipe(

                      mergeMap(t => makeOf(t)),

                      scan<Post>((all, cur) => [cur, ...all], []),

                      map(t => t.sort(
                              (a, b) => b.creationDate.seconds -
                                  a.creationDate.seconds)),
                      tap(list => console.log('onsnapshot query', list)), );

        })

        // this.listeningOnchange$.subscribe(console.log);
        // this.scrols.subscribe(console.log);

        this.list$ =
        merge(firstPage, scrols$)
            .pipe(
                scan<Post[]>((all, cur) => [...all, ...cur]),

                tap(list => console.log('streamed query', list)),

                tap(list => list.sort(
                        (a, b) =>
                            b.creationDate.seconds - a.creationDate.seconds)),

                tap(list => this.disabledInfiniteScroll = list.length <= 0));
  }
  emitScroll(event) {
    console.log('scroll', event);
    this.scrols.next(event);
  }
}
