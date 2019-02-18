import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('textbox') textbox: any;
  message: string;
  currentAccount: any;
  chats: any[];
  loadedChats: any[];
  docRef: any;
  lastVisible: any;
  disabledInfiniteScroll = true;
  unsubscribe;
  textSearch: string;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  getItems(searchbar) {
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    this.textSearch = q;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    console.log(q);
  }
}
