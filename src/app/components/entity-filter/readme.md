# Import Entity filter into your page.
## Import component into you ng module
```
import {EntityFilterModule} from '../../shared/entity-filter/entity-filter.module';
```

## HTML 
keys: the keys used to make a new filter
filter: pass the state of component
```
 <app-entity-filter-controller [keys]="filterKeys" [filter]="filter" (changeList)="changeFilter($event)">
        </app-entity-filter-controller>
```

## USAGE
```
  //initialize array
  serviceRequests: ServiceRequest[];
  // disable infinite scroll at start
  disabledInfiniteScroll = true;
  // set default sort
  filter: IFilter = {
    field: 'status',
    operator: OperatorType.EQUAL,
    value: ServiceRequestStatus.WAITING
  };
  // create array with the keys whose make filter
  filterKeys: string[] = [
    'id', 'creationDate', 'nominative', 'provider', 'providerName', 'status',
    'type', 'user', 'paymentType'
  ];

  constructor(private serviceReuqestService: ServiceRequestService) {}
  // at start load first snapshop
  pageWillEnter() { this.transition(); }
  transition() {
    this.serviceRequests = [];
    this.loadPage(false);
  }
  // listen on change filter
  changeFilter(criteria) {
    if (criteria.filter) {
      this.filter = criteria.filter;
    } else {
      this.filter = {field: 'creationDate', sort: SortType.DESC};
    }
    this.transition();
  }
  // called by infinite scroll for append data
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.loadPage(true);
    }, 500);
  }
  // call the date with filter and append parameter
  loadPage(append) {
    this.serviceReuqestService.query(append, this.filter).then(data => {
      if (data.length <= 0) {
        // disable infinite-scroll when data are fineshed
        this.disabledInfiniteScroll = true;
      } else {
        this.serviceRequests = [...this.serviceRequests, ...data];
        this.disabledInfiniteScroll = false;
      }
    });
  }
  
```
