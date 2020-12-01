import { UserType } from '../../data-table/userType';
import { UserAction, InventoryActionTypes } from '../actions/user.action';

export interface UserState {
    list: UserType[];
    error: Error;
}

export const initialState: UserState = {
    list: [],
    error: undefined
};

export function UserReducer(state: UserState = initialState, action: UserAction) {
    switch (action.type) {
        case InventoryActionTypes.LOAD_USER:
            return { ...state };
        case InventoryActionTypes.LOAD_USER_SUCCESS:
            return { ...state, list: action.payload };
        case InventoryActionTypes.LOAD_USER_FAILURE:
            return {
                list: [],
                error: action.payload,
            }
        default:
            return state;
    }
}
