import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserAction, InventoryActionTypes, LoadUserAction, LoadUserSuccessAction, LoadUserFailureAction } from '../actions/user.action';
import { UserService } from '../../service/user.service';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {
    @Effect() loadShopping$ = this.actions$
        .pipe(
            ofType<UserAction>(InventoryActionTypes.LOAD_USER),
            mergeMap(
                (id) => this.userService.getUserList(id.payload)
                    .pipe(
                        map(data => {
                            return new LoadUserSuccessAction(data);
                        }),
                        catchError(error => of(new LoadUserFailureAction(error)))
                    )
            ),
        );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
