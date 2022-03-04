import {Dispatch} from "redux";
import {authApi, RequestType} from "../api/auth-api";
import {profileApi} from "../api/profile-api";
import {UserType} from "./users-reducer";
import {usersAPI} from "../api/users-api";

const initialState: initialStateType = {
    isLoggedIn: false,
    loginName: null,
    me: {
        id: 0,
        photo: null,
    },
    followings: []
}


export const AuthReducer = (state: initialStateType = initialState, action: AuthReducerActionsTypes) => {
    switch (action.type) {
        case "login/AUTHORIZED":
            return {...state, loginName: action.loginName}
        case "login/SET-LOGIN-IN":
            return {...state, isLoggedIn: action.value}
        case "me/SET-ID":
            return {...state, me: {...state.me, id: action.id}}
        case "me/SET-PHOTO":
            return {...state, me: {...state.me, photo: action.photo}}
        case "me/GET-FOLLOWING":
            return {...state,followings:action.users as UserType[]}
        case "me/ADD-FOLLOWINGS":
            return {...state,followings:[...state.followings,action.user] as UserType[]}
        default:
            return state;
    }
}

//Actions
export const authorizedAC = (loginName: string | null) => ({type: 'login/AUTHORIZED', loginName} as const);
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-LOGIN-IN', value} as const);
const setAuthorizedIdAC = (id: number) => ({type: 'me/SET-ID', id} as const);
const setAuthorizedUserPhotoAC = (photo: string | null) => ({type: 'me/SET-PHOTO', photo} as const);
const addFollowingAC = (user: UserType) => ({type: 'me/ADD-FOLLOWINGS', user} as const);
const getFollowingAC = (users: UserType[]) => ({type:'me/GET-FOLLOWING',users} as const);

//Thunks
export const authorizedTC = () => (dispatch: Dispatch) => {
    authApi.loginName()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authorizedAC(res.data.data.login));
                dispatch(setAuthorizedIdAC(res.data.data.id));
                dispatch(setIsLoggedInAC(true));

                profileApi.getUserProfile(res.data.data.id)
                    .then(res => {
                        dispatch(setAuthorizedUserPhotoAC(res.data.photos.small));
                    })
            }
        })
}
export const setLoggedInTC = (data: RequestType) => (dispatch: Dispatch) => {
    authApi.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAuthorizedIdAC(res.data.data.id));
        }
    })
}
export const setLoggedOutTC = () => (dispatch: Dispatch) => {
    authApi.logout().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authorizedAC(null));
            dispatch(setIsLoggedInAC(false));
        }
    })
}
export const addFollowingTC = (count: number, page: number) => (dispatch: Dispatch) => {
    usersAPI.getUsers(count, page)
        .then(res => {
            dispatch(addFollowingAC(res.data.items))
        })
}
export const getFollowingTC = () => (dispatch:Dispatch) => {
    usersAPI.getFollowing()
        .then(res => {
            dispatch(getFollowingAC(res));
        });

}

//Type
type initialStateType = {
    isLoggedIn: boolean
    loginName: null | string
    me: {
        id: number
        photo: string | null
    }
    followings: UserType[]
};

export type AuthReducerActionsTypes = ReturnType<typeof authorizedAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setAuthorizedIdAC>
    | ReturnType<typeof setAuthorizedUserPhotoAC>
    | ReturnType<typeof addFollowingAC>
    | ReturnType<typeof getFollowingAC>;
