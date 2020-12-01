import { Action } from '@ngrx/store';
import { UserType } from '../../data-table/userType';

export enum InventoryActionTypes {
  LOAD_USER = '[USER] Load User',
  LOAD_USER_SUCCESS = '[USER] Load User Success',
  LOAD_USER_FAILURE = '[USER] Load User Failure',
}

export class LoadUserAction implements Action {
  readonly type = InventoryActionTypes.LOAD_USER;
  constructor(public payload: string) {
  }
}

export class LoadUserSuccessAction implements Action {
  readonly type = InventoryActionTypes.LOAD_USER_SUCCESS;
  constructor(public payload: Array<UserType>) { }
}

export class LoadUserFailureAction implements Action {
  readonly type = InventoryActionTypes.LOAD_USER_FAILURE;
  constructor(public payload: Error) { }
}

export type UserAction = LoadUserAction | LoadUserSuccessAction | LoadUserFailureAction;
