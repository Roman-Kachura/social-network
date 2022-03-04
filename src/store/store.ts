import {applyMiddleware, combineReducers, createStore} from "redux";
import {PostsReducer, PostsReducerActionsTypes} from "./posts-reducer";
import {UsersReducer, UsersReducerActionsTypes} from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
import {ProfileReducer, ProfileReducerActionsTypes} from "./profile-reducer";
import {AuthReducer, AuthReducerActionsTypes} from "./auth-reducer";
import {ThunkAction} from "redux-thunk/src/types";
import {DialogsReducer, DialogsReducerActionTypes} from "./dialogs-reducer";

export const rootReducer = combineReducers({
    posts:PostsReducer,
    usersPage:UsersReducer,
    profilePage:ProfileReducer,
    auth:AuthReducer,
    dialogsPage:DialogsReducer
});
export type RootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
export type AppActionsTypes = AuthReducerActionsTypes
    | PostsReducerActionsTypes
    | ProfileReducerActionsTypes
    | UsersReducerActionsTypes
    |DialogsReducerActionTypes;
export type ThunksTypes = ThunkAction<void, RootReducerType, unknown, AppActionsTypes>;

//@ts-ignore
window.store = store;