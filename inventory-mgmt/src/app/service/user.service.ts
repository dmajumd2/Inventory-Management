import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserType } from '../data-table/userType';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private USER_URL = 'https://jsonplaceholder.typicode.com/users/';
    constructor(private http: HttpClient) {

    }

    getUserList(id) {
        return this.http.get<Array<UserType>>(`${this.USER_URL}${id ? id : ''}`);
    }
}
