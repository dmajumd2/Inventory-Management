import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }
  searchValue = '';
  valuetoSend = '';

  ngOnInit(): void {
  }
  onSearch(): void {
    this.valuetoSend = this.searchValue;
  }

}
