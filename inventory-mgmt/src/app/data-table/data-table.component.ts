import { LoadUserAction } from './../store/actions/user.action';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserType } from './userType';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../store/model/app-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  ELEMENT_DATA: UserType[] = [];
  displayedColumns: string[] = ['email', 'id', 'name', 'phone', 'website'];
  dataSource = new MatTableDataSource<UserType>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() searchValue: string;
  userItems: Observable<any>;
  error$: Observable<Error>;

  constructor(private _snackBar: MatSnackBar,
    private store: Store<AppState>) {
  }

  ngOnChanges(): void {

    this.userItems = this.store.select(store => store.user);
    this.userItems.subscribe((data) => {
      this.dataSource.data = this.searchValue ? [data.list] as UserType[] : data.list as UserType[];
    });

    this.store.dispatch(new LoadUserAction(this.searchValue));

    // const http$ = this.httpClient.get<UserType>(`https://jsonplaceholder.typicode.com/users/${this.searchValue ? this.searchValue : ''}`);

    // http$.subscribe(
    //   res => this.dataSource.data = this.searchValue ? [res] as UserType[] : res as unknown as UserType[],
    //   err => {
    //     this.dataSource.data = [] as UserType[];
    //     this._snackBar.open('Unable to find the user', '', {
    //       duration: 2000,
    //     });
    //   }
    // );
  }

  ngOnInit() {
    this.userItems = this.store.select(store => store.user);
    this.error$ = this.store.select(store => store.user.error);

    this.userItems.subscribe((data) => {
      this.dataSource.data = this.searchValue ? [data.list] as UserType[] : data.list as UserType[];
    });
    this.error$.subscribe(data => {
      if (data) {
        this.dataSource.data = [] as UserType[];
        this._snackBar.open('Unable to find the user', '', {
          duration: 2000,
        });
      }
    })
    this.store.dispatch(new LoadUserAction(''));
  }
}
