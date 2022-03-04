import {usersAPI} from "../api/users-api";
import {Dispatch} from "redux";
import {subscribeApi} from "../api/subscribe-api";


let initialState = {
    users: [] as UserType[],
    totalCount: 0,
    currentPageNumber: 1,
};
export const howShowUsersCount = 10;


export const UsersReducer = (state: UsersStateType = initialState, action: UsersReducerActionsTypes): UsersStateType => {
    switch (action.type) {
        case "GET-USERS":
            return {...state, users: action.users};
        case "GET-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount};
        case "SET-PAGE-NUMBER":
            return {...state, currentPageNumber: action.currentPageNumber}
        case "SET-FOLLOW":
            return {
                ...state,
                users: state.users.map(u => action.userID === u.id ? {...u, followed: action.isFollow} : u)
            }
        default:
            return state;
    }
}


//ActionCreators
export const getUsersAC = (users: UserType[]) => ({type: 'GET-USERS', users} as const);
export const getTotalCountAC = (totalCount: number) => ({type: 'GET-TOTAL-COUNT', totalCount} as const);
export const setUserPageNumber = (currentPageNumber: number) => ({type: 'SET-PAGE-NUMBER', currentPageNumber} as const);
export const followUserAC = (userID: number, isFollow: boolean) => ({type: 'SET-FOLLOW', isFollow, userID} as const)

//ThunkCreators
export const getUsersPageTC = (count: number, page: number) => (dispatch: Dispatch) => {
    if (count === null) count = howShowUsersCount;
    usersAPI.getUsers(count, page)
        .then(res => {
            dispatch(getUsersAC(res.data.items));
            dispatch(getTotalCountAC(res.data.totalCount));
            dispatch(setUserPageNumber(page));
        })
}
export const checkFollowUserTC = (userID: number) => (dispatch: Dispatch) => {
    subscribeApi.checkFollow(userID)
        .then(res => {
            console.log(res);
        })
}
export const followUserTC = (userID: number) => (dispatch: Dispatch) => {
    subscribeApi.follow(userID)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(followUserAC(userID, true));
            }
        })
}
export const unfollowUserTC = (userID: number) => (dispatch: Dispatch) => {
    subscribeApi.unfollow(userID)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(followUserAC(userID, false));
            }
        })
}


//Types
export type UserType = {
    id: number
    name: string
    status: string | null
    photos: {
        small: string | null
        large: string | null
    }
    followed: boolean
    uniqueUrlName: string | null
}
export type UsersStateType = typeof initialState;
export type UsersReducerActionsTypes =
    ReturnType<typeof getUsersAC>
    | ReturnType<typeof getTotalCountAC>
    | ReturnType<typeof setUserPageNumber>
    | ReturnType<typeof followUserAC>;
