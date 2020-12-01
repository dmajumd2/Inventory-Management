import { UserType } from '../../data-table/userType';
import { UserState } from '../reducers/user.reducer';

export interface AppState {
    readonly user: UserState;
}
